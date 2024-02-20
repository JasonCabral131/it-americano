/** @format */

import React, { useCallback } from 'react';
import { UserType } from '../../type';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, FlatList, HStack, Input, Text, Pressable } from 'native-base';
import colors from '../../constant/colors';
import UserAvatar from './UserAvatar';
import { Fonts } from '../../constant/fonts';
import { hitSlop } from '../../utils';
import { Feather } from '@expo/vector-icons';
import { capitalize } from 'lodash';
import { TouchableOpacity } from 'react-native';
type props = {
	onPress: (val: UserType) => void;
	onBack: () => void;
};
const Users: React.FC<props> = ({ onPress = () => {}, onBack = () => {} }) => {
	const users = useSelector((state: RootState) => state?.users.users);
	const renderItem = useCallback(
		({ item }: { item: UserType }) => {
			return (
				<TouchableOpacity
					onPress={() => {
						onBack();
						onPress(item);
					}}>
					<Box
						px={2}
						py={2}
						mt={2}
						borderBottomColor={colors.secondaryBlack}
						borderBottomWidth={'1px'}>
						<HStack
							space={2}
							justifyContent={'flex-start'}
							alignItems={'center'}>
							<UserAvatar username={item?.username} />
							<Text
								fontFamily={Fonts.gilroy.bold}
								fontSize={'lg'}>
								{capitalize(item?.username)}
							</Text>
						</HStack>
					</Box>
				</TouchableOpacity>
			);
		},
		[onPress, onBack]
	);
	return (
		<Box flex={1}>
			<Input
				leftElement={
					<Pressable
						onPress={() => onBack()}
						pl={3}
						hitSlop={hitSlop}
						_pressed={{ opacity: 0.7 }}>
						<Feather
							name='arrow-left'
							size={20}
						/>
					</Pressable>
				}
				focusOutlineColor={'white'}
				borderColor={'white'}
				placeholder='Back'
				fontSize={'md'}
				fontFamily={Fonts.gilroy.bold}
				bgColor={'transparent'}
				readOnly
			/>
			<FlatList
				data={users || []}
				numColumns={1}
				renderItem={renderItem}
				keyExtractor={(item) => item?._id.toString()}
				initialNumToRender={10}
				flex={1}
			/>
		</Box>
	);
};

export default React.memo(Users);
