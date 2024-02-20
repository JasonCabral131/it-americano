/** @format */

import React, { useCallback, useState, ReactNode } from 'react';
import { Box, HStack, Text, VStack, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import colors from '../../constant/colors';

type headerProps = {
	title: string;
	content: React.ReactElement | (() => React.ReactElement);
};

type Props = {
	content: headerProps[];
	active?: number;
};

const PrimaryTabView: React.FC<Props> = (props) => {
	const { content, active } = props;
	const [tabActive, setTabActive] = useState(active || 0);

	const TabBody = useCallback((): ReactNode => {
		try {
			if (typeof content[tabActive].content === 'function') {
				const Body = content[tabActive].content as () => React.ReactElement;

				return <Body />;
			} else {
				return content[tabActive].content as React.ReactElement;
			}
		} catch (e) {
			return <Box />;
		}
	}, [tabActive, content]);

	return (
		<VStack flex={1}>
			<Box
				px={2}
				mt={2}>
				<HStack
					backgroundColor={colors.white}
					justifyContent='space-between'
					alignItems='center'
					w='100%'>
					{content.map((data, index) => (
						<View
							key={index}
							display='flex'
							justifyContent='center'
							alignItems='center'
							borderWidth={1}
							borderColor={colors.secondaryBlack}
							w={`${100 / content.length}%`}>
							<TouchableOpacity
								onPress={() => setTabActive(index)}
								style={{
									width: '100%',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Box
									shadow={tabActive === index ? 4 : 'none'}
									backgroundColor={
										tabActive === index ? colors.secondaryBlack : colors.white
									}
									justifyContent='center'
									alignItems='center'
									paddingY={1}
									style={{
										shadowColor:
											tabActive === index ? colors.whiteGrey : 'transparent',
									}}
									textAlign='center'
									w='100%'>
									<Text
										letterSpacing={0.9}
										fontWeight='semibold'
										fontSize='md'
										color={
											tabActive === index ? colors.white : colors.secondaryBlack
										}
										adjustsFontSizeToFit
										numberOfLines={1}>
										{data.title}
									</Text>
								</Box>
							</TouchableOpacity>
						</View>
					))}
				</HStack>
			</Box>

			{content[tabActive]?.content ? <TabBody /> : null}
		</VStack>
	);
};

export default React.memo(PrimaryTabView);
