/** @format */

import React from 'react';

import BaseScreen from '../../components/BaseScreen';

import { useRoute } from '@react-navigation/native';

const TransparentModal = () => {
	const { content, fullScreen }: any = useRoute().params || {};
	return (
		<BaseScreen
			backgroundColor='transparent'
			fullScreen={fullScreen}>
			{content}
		</BaseScreen>
	);
};

export default TransparentModal;
