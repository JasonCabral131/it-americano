/** @format */
import uuid from 'react-native-uuid';

import React from 'react';
import BaseScreen from '../../components/BaseScreen';
import {
	Box,
	Button,
	Circle,
	HStack,
	Image,
	Text,
	VStack,
	useToast,
} from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	Dimensions,
	ImageBackground,
	Keyboard,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { coffeIcon, loginCoffeBg } from '../../constant/image';
import colors from '../../constant/colors';
import { Entypo } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import Form from './Form';
import { formSchema } from './schema';
import { useNavigation } from '@react-navigation/native';
import ToastBox from '../../components/ToastBox';
import { useDispatch } from 'react-redux';
import { setAddUser } from '../../redux/feature/UserSlice';
import { setLoader } from '../../redux/feature/LoaderSlice';
const { width, height } = Dimensions.get('window');
const CreateAccount = () => {
	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const toast = useToast();
	const { control, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
		resolver: yupResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});
	const onSubmit = async ({
		username,
		password,
	}: {
		username: string;
		password: string;
	}) => {
		try {
			const newUser = {
				username: username?.trim(),
				password: password?.trim(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				_id: uuid.v4() as string,
			};
			dispatch(setLoader(true));
			const res = await dispatch(setAddUser(newUser));
			dispatch(setLoader(false));
			navigation.navigate('Home');
			console.log(res, 'res');
		} catch (error: any) {
			dispatch(setLoader(false));
			toast.show({
				render(props: any) {
					return (
						<ToastBox
							msg={error?.message}
							type='error'
							onClose={() => {
								toast.close(props.id);
							}}
						/>
					);
				},
				placement: 'top',
			});
		}
	};
	return (
		<BaseScreen fullScreen>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>
				<VStack flex={1}>
					<ImageBackground
						source={loginCoffeBg}
						resizeMode='cover'
						imageStyle={style.imageStyle}
						style={style.container}>
						<Circle
							p={6}
							bgColor={colors.white}>
							<Image
								source={coffeIcon}
								width={'60px'}
								height={'60px'}
								alt='login-coffee'
							/>
						</Circle>
						<Form control={control} />
					</ImageBackground>
					<Box
						px={4}
						mt={-6}>
						<Button
							onPress={handleSubmit(onSubmit)}
							_pressed={{ opacity: 0.9 }}
							bgColor={colors.primary}
							rounded={'full'}>
							<HStack
								justifyContent={'center'}
								alignItems={'center'}
								space={2}>
								<Text
									letterSpacing={1}
									fontSize={'md'}
									color={colors.white}
									fontWeight={'extrabold'}>
									Create account
								</Text>
								<Entypo
									name='chevron-right'
									size={20}
									color={colors.white}
								/>
							</HStack>
						</Button>
					</Box>
					<HStack
						mt={20}
						justifyContent={'center'}
						alignItems={'center'}>
						<Text fontSize={'xl'}>Already have an Account? </Text>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Text
								fontSize={'xl'}
								fontWeight={'bold'}
								color={colors.primary}>
								Sign in
							</Text>
						</TouchableOpacity>
					</HStack>
				</VStack>
			</TouchableWithoutFeedback>
		</BaseScreen>
	);
};

export default React.memo(CreateAccount);

const style = StyleSheet.create({
	imageStyle: {
		width,
		height: height * 0.6,
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
		height: height * 0.6,
		paddingHorizontal: 15,
	},
});
