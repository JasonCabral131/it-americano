/** @format */
import LottieView from 'lottie-react-native';

import React, { useEffect } from 'react';
import BaseScreen from '../../components/BaseScreen';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import colors from '../../constant/colors';
import { splash } from '../../constant/image';
import { loading } from '../../constant/lotties';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getUser } from '../../service/authService';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/feature/UserSlice';
const { width, height } = Dimensions.get('window');

const Splash = () => {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	useEffect(() => {
		if (isFocused) {
			(async () => {
				const isLoginUser = await getUser();
				if (isLoginUser) {
					dispatch(setAuthUser(isLoginUser));
					return navigation.reset({
						index: 0,
						routes: [{ name: 'Home' }],
					});
				}
				return navigation.navigate('Login');
			})();
		}
	}, [isFocused]);
	return (
		<BaseScreen fullScreen>
			<ImageBackground
				source={splash}
				imageStyle={style.imageStyle}
				style={style.container}
				resizeMode='cover'>
				<LottieView
					source={loading}
					style={{ height: 220, width: 220, alignSelf: 'center' }}
					loop
					autoPlay
				/>
			</ImageBackground>
		</BaseScreen>
	);
};

export default React.memo(Splash);

const style = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageStyle: {
		height: height,
		width: width,
		flex: 1,
	},
});
