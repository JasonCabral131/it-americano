/** @format */

import { Box, Input, Text } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';
import colors from '../../constant/colors';
import { Entypo } from '@expo/vector-icons';
type props = {
	control: any;
};
const Form: React.FC<props> = ({ control }) => {
	return (
		<>
			<Controller
				control={control}
				name='username'
				render={({
					field: { value, onBlur, onChange },
					fieldState: { error },
				}) => {
					return (
						<>
							<Input
								value={value}
								onBlur={onBlur}
								onChangeText={onChange}
								focusOutlineColor={colors.white}
								placeholder='Username'
								rounded={'full'}
								size={'lg'}
								leftElement={
									<Box ml={4}>
										<Entypo
											name='user'
											size={18}
											color={colors.whiteGrey}
										/>
									</Box>
								}
								_input={{
									color: colors.white,
									fontSize: 'lg',
								}}
								mt={10}
								autoCorrect={false}
								autoComplete='off'
								autoFocus
								color={colors.white}
								placeholderTextColor={colors.white}
							/>
							<Box
								width={'100%'}
								mt={2}>
								<Text
									fontSize='xs'
									fontFamily='Gilroy-Medium'
									color={colors.danger}
									display={error ? undefined : 'none'}>
									{error?.message}
								</Text>
							</Box>
						</>
					);
				}}
			/>
			<Controller
				control={control}
				name='password'
				render={({
					field: { value, onBlur, onChange },
					fieldState: { error },
				}) => {
					return (
						<>
							<Input
								value={value}
								onBlur={onBlur}
								onChangeText={onChange}
								focusOutlineColor={colors.white}
								placeholder='Password'
								rounded={'full'}
								placeholderTextColor={colors.white}
								size={'lg'}
								mt={2}
								_input={{
									color: colors.white,
									fontSize: 'lg',
								}}
								leftElement={
									<Box ml={4}>
										<Entypo
											name='lock'
											size={18}
											color={colors.whiteGrey}
										/>
									</Box>
								}
								autoCorrect={false}
								autoComplete='off'
								type='password'
							/>
							<Box width={'100%'}>
								<Text
									fontSize='xs'
									fontFamily='Gilroy-Medium'
									color={colors.danger}
									display={error ? undefined : 'none'}>
									{error?.message}
								</Text>
							</Box>
						</>
					);
				}}
			/>
		</>
	);
};

export default React.memo(Form);
