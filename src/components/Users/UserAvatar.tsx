/** @format */

import { capitalize } from 'lodash';
import { Circle, Text } from 'native-base';
import React from 'react';
import { Fonts } from '../../constant/fonts';
import colors from '../../constant/colors';

const UserAvatar = ({ username }: { username: string }) => {
	return (
		<Circle
			p={1}
			width={'40px'}
			height={'40px'}
			bgColor='#CDDEF8'>
			<Text
				fontFamily={Fonts.gilroy.bold}
				color={colors.white}
				fontSize={'md'}>
				{capitalize(username).slice(0, 1)}
			</Text>
		</Circle>
	);
};

export default React.memo(UserAvatar);
