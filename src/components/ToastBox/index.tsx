/** @format */

import { Box, HStack, Text } from 'native-base';
import React, { useRef } from 'react';
import { Dimensions, Image, PanResponder, Animated } from 'react-native';
import colors from '../../constant/colors';

export type Props = {
	icon?: any;
	msg: string;
	type: 'success' | 'error' | 'informative' | 'warning';
	iconHide?: boolean;
	onClose?: () => void;
	renderAction?: React.ReactElement;
};

const ToastBox: React.FC<Props> = (props) => {
	const {
		icon,
		msg,
		type,
		iconHide = false,
		onClose = () => {},
		renderAction,
	} = props;
	const translateY = useRef(new Animated.Value(0)).current;

	const iconType = {
		success: require('./asset/success.png'),
		error: require('./asset/error.png'),
		informative: require('./asset/informative.png'),
		warning: require('./asset/warning.png'),
	};

	const iconToShow = icon ? icon : iconType[type];
	let bgColor = '#E9F5EE';
	let borderColor = '#219653';
	const fontColor = colors.black;

	switch (type) {
		case 'success':
			bgColor = '#E9F5EE';
			borderColor = '#219653';
			break;
		case 'informative':
			bgColor = '#EBF2FC';
			borderColor = '#377CE3';
			break;
		case 'error':
			bgColor = '#FEEFF1';
			borderColor = '#F46375';
			break;
		case 'warning':
			bgColor = '#FFFCDF';
			borderColor = '#E9AA09';
			break;
	}
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (_, gestureState) => {
				if (gestureState.dy < 0) {
					Animated.event([null, { dy: translateY }], {
						useNativeDriver: false,
					})(null, { dy: gestureState.dy });
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dy < -50) {
					onClose && onClose();
				} else {
					Animated.spring(translateY, {
						toValue: 0,
						useNativeDriver: false,
					}).start();
				}
			},
		})
	).current;
	const fadeOutOpacity = translateY.interpolate({
		inputRange: [-50, 0],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});
	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[
				{
					transform: [{ translateY }],
					opacity: fadeOutOpacity,
				},
			]}>
			<Box
				bg={bgColor}
				px={3}
				w={Dimensions.get('window').width * 0.95}
				alignSelf='center'
				borderColor={borderColor}
				borderWidth={1}
				py={3}
				borderRadius={12}
				mb={5}
				flexDirection='row'
				alignItems='center'>
				<HStack
					width={renderAction ? '81%' : '100%'}
					justifyContent='space-between'
					alignItems='center'>
					<HStack alignItems='center'>
						{iconHide ? null : (
							<Image
								source={iconToShow}
								style={{ width: 28, height: 28 }}
								resizeMode='contain'
							/>
						)}

						<Text
							fontFamily='Gilroy-Bold'
							fontSize='sm'
							color={fontColor}
							flex={1}
							marginLeft='12px'
							flexWrap='wrap'>
							{msg}
						</Text>
					</HStack>
				</HStack>
				{renderAction ? (
					<Box
						justifyContent='flex-end'
						alignItems='flex-end'>
						{renderAction}
					</Box>
				) : null}
			</Box>
		</Animated.View>
	);
};

export default React.memo(ToastBox);
