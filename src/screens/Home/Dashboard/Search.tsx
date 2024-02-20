/** @format */

import { Box, Input } from 'native-base';
import React from 'react';
import colors from '../../../constant/colors';
import { Fonts } from '../../../constant/fonts';
type props = {
	value: string;
	setValue: (val: string) => void;
	renderRightContent?: React.ReactElement;
};
const Search: React.FC<props> = ({ renderRightContent, value, setValue }) => {
	return (
		<Box
			rounded='full'
			shadow={3}
			px={3}
			mt={4}
			bg={colors.white}>
			<Input
				borderWidth={0}
				bgColor={colors.white}
				focusOutlineColor={'transparent'}
				value={value}
				onChangeText={setValue}
				fontSize='xs'
				fontFamily={Fonts.gilroy.bold}
				placeholder='search here'
				rightElement={renderRightContent}
			/>
		</Box>
	);
};

export default React.memo(Search);
