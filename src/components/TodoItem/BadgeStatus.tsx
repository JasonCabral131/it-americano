/** @format */

import React from 'react';
import { Badge, Box, HStack, Text } from 'native-base';
import colors from '../../constant/colors';
import { Fonts } from '../../constant/fonts';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { capitalize } from 'lodash';
type props = {
	status: string;
	onPress: () => void;
};
const BadgeStatus: React.FC<props> = ({ status, onPress = () => {} }) => {
	let bgColor = 'gray.600';
	switch (status) {
		case 'new':
			bgColor = 'gray.400';
			break;
		case 'developing':
			bgColor = 'blue.400';
			break;
		case 'review':
			bgColor = 'yellow.400';
			break;
		case 'complete':
			bgColor = 'green.400';
			break;
	}
	return (
		<TouchableOpacity onPress={onPress}>
			<Badge
				rounded={'full'}
				bgColor={bgColor}>
				<HStack
					alignItems={'center'}
					justifyContent={'space-between'}>
					<Box>
						<Text
							color={colors.white}
							fontFamily={Fonts.gilroy.bold}>
							{capitalize(status)}
						</Text>
					</Box>
					<Box
						justifyContent={'flex-end'}
						alignItems={'flex-end'}
						ml={2}>
						<Entypo
							name='chevron-down'
							size={22}
							color={colors.white}
						/>
					</Box>
				</HStack>
			</Badge>
		</TouchableOpacity>
	);
};

export default React.memo(BadgeStatus);
