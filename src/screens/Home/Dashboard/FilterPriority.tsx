/** @format */

import { Box, Text } from 'native-base';
import React, { useState } from 'react';
import colors from '../../../constant/colors';
import { TouchableOpacity } from 'react-native';
import { Fonts } from '../../../constant/fonts';
import { capitalize } from 'lodash';
type props = {
	onPress: (val: string) => void;
};
const FilterPriority: React.FC<props> = ({ onPress = () => {} }) => {
	const [priorityVALUE] = useState(['low', 'medium', 'high']);

	return (
		<Box
			position={'absolute'}
			top={'60px'}
			zIndex={100}
			right={16}>
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
							onPress={() => onPress(data)}>
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

export default React.memo(FilterPriority);
