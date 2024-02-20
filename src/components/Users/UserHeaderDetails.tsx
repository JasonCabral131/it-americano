/** @format */
import React from 'react';
import { Box, HStack, Text } from 'native-base';
import UserAvatar from './UserAvatar';
import { TouchableOpacity } from 'react-native';
import colors from '../../constant/colors';
import { Fonts } from '../../constant/fonts';
import { capitalize } from 'lodash';
import { hitSlop } from '../../utils';
type props = {
	currentUsername: string;
	handlePresent?: () => void;
	showAssigned?: boolean;
	disableClicking?: boolean;
	alignItems?: string;
	onPressAvatar?: () => void;
};
const UserHeaderDetails: React.FC<props> = ({
	handlePresent = () => {},
	currentUsername,
	showAssigned = true,
	disableClicking = false,
	alignItems = 'center',
	onPressAvatar,
}) => {
	return (
		<HStack
			alignItems={alignItems}
			space={2}>
			<TouchableOpacity
				onPress={onPressAvatar}
				disabled={onPressAvatar ? false : true}>
				<UserAvatar username={currentUsername || ''} />
			</TouchableOpacity>
			<Box>
				<TouchableOpacity
					disabled={disableClicking}
					hitSlop={hitSlop}
					onPress={handlePresent}>
					{showAssigned ? (
						<Text
							color={colors.secondaryBlack}
							fontFamily={Fonts.gilroy.bold}
							fontSize={'xs'}>
							Assinged to
						</Text>
					) : null}

					<Text
						color={colors.black}
						fontFamily={Fonts.gilroy.semiBold}
						fontSize={'sm'}>
						{capitalize(currentUsername || '')}
					</Text>
				</TouchableOpacity>
			</Box>
		</HStack>
	);
};

export default React.memo(UserHeaderDetails);
