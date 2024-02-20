/** @format */

import { Box, HStack, Pressable, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';

import { Fonts } from '../../../constant/fonts';
import colors from '../../../constant/colors';
import { capitalize } from 'lodash';
import { TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { hitSlop } from '../../../utils';
import { UserType } from '../../../type';
import UserHeaderDetails from '../../../components/Users/UserHeaderDetails';
type props = {
	currentUser: UserType | null;
	handlePresent: () => void;
	priority: string;
	setPriority: (val: string) => void;
};
const AssignedAndPriority: React.FC<props> = ({
	currentUser,
	handlePresent = () => {},
	priority = 'low',
	setPriority = () => {},
}) => {
	const [showPriority, setShowPriority] = useState(false);
	const [priorityVALUE] = useState(['low', 'medium', 'high']);

	const handleShowPriority = useCallback(() => {
		setShowPriority((prev) => !prev);
	}, []);

	return (
		<View zIndex={1}>
			<HStack
				justifyContent={'space-between'}
				alignItems={'center'}>
				<UserHeaderDetails
					handlePresent={handlePresent}
					currentUsername={currentUser?.username || ''}
				/>

				<Pressable
					onPress={handleShowPriority}
					hitSlop={hitSlop}
					_pressed={{ opacity: 0.7 }}
					justifyContent={'flex-end'}>
					<HStack alignItems={'center'}>
						<MaterialCommunityIcons
							size={20}
							name='reload-alert'
							color={colors.secondaryBlack}
						/>

						<Text
							ml={2}
							fontSize={'sm'}
							fontFamily={Fonts.gilroy.semiBold}
							color={colors.secondaryBlack}>
							{capitalize(priority)}
						</Text>
						<Entypo
							size={18}
							name='chevron-down'
							color={colors.secondaryBlack}
						/>
					</HStack>
				</Pressable>
			</HStack>
			{showPriority ? (
				<Box
					position={'absolute'}
					top={'40px'}
					zIndex={100}
					right={-1}>
					<Box
						px={5}
						py={3}
						bgColor={colors.white}
						rounded={'2xl'}
						shadow={4}>
						{priorityVALUE?.map((data) => {
							return (
								<TouchableOpacity
									key={data}
									onPress={() => {
										handleShowPriority();
										setPriority(data);
									}}>
									<Text
										mt={1}
										fontFamily={Fonts.gilroy.bold}>
										{capitalize(data)}
									</Text>
								</TouchableOpacity>
							);
						})}
					</Box>
				</Box>
			) : null}
		</View>
	);
};

export default React.memo(AssignedAndPriority);
