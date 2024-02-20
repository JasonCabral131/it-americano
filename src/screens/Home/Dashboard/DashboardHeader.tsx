/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Box, HStack, Text, VStack } from 'native-base';
import colors from '../../../constant/colors';
import { capitalize } from 'lodash';
import { Fonts } from '../../../constant/fonts';
import UserAvatar from '../../../components/Users/UserAvatar';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { setAuthUser } from '../../../redux/feature/UserSlice';

const DashboardHeader = () => {
	const user = useSelector((state: RootState) => state?.users?.auth);
	const username = user?.username || '';
	const navigation = useNavigation();
	const dispatch = useDispatch();
	return (
		<VStack width={'100%'}>
			<HStack
				space={2}
				justifyContent={'space-between'}
				alignItems={'center'}>
				<UserAvatar username='username' />
				<Box justifyContent='flex-end'>
					<TouchableOpacity
						onPress={() => {
							dispatch(setAuthUser(null));
							navigation.reset({
								index: 1,
								routes: [{ name: 'Login' }],
							});
						}}>
						<Entypo
							name='arrow-right'
							size={25}
							color={colors.secondaryBlack}
						/>
					</TouchableOpacity>
				</Box>
			</HStack>
			<Text
				fontSize={'lg'}
				fontFamily={Fonts.gilroy.bold}
				mt={2}>
				Hi, {capitalize(username)}
			</Text>
		</VStack>
	);
};

export default React.memo(DashboardHeader);
