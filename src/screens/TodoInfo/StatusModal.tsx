/** @format */

import { Box, Text } from 'native-base';
import React, { useState } from 'react';
import colors from '../../constant/colors';
import { stats } from '../../constant/mockData';
import { TouchableOpacity } from 'react-native';
import { Fonts } from '../../constant/fonts';
import { capitalize } from 'lodash';
type props = {
	handleUpdateStatus: (data: string) => void;
	top?: string;
	left?: string;
};
const StatusModal: React.FC<props> = ({
	handleUpdateStatus,
	left = '140px',
	top = '40px',
}) => {
	const [statuses] = useState(stats);
	return (
		<Box
			position={'absolute'}
			top={top}
			zIndex={100}
			left={left}>
			<Box
				px={5}
				py={3}
				bgColor={colors.white}
				rounded={'2xl'}
				shadow={4}>
				{statuses?.map((data) => {
					return (
						<TouchableOpacity
							key={data}
							onPress={() => {
								handleUpdateStatus(data);
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
	);
};

export default React.memo(StatusModal);
