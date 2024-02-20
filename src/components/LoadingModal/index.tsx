/** @format */

import { Modal } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useCountdown } from 'usehooks-ts';
import { setLoader } from './../../redux/feature/LoaderSlice';
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { loading } from '../../constant/lotties';

const LoadingModal = () => {
	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: 20,
		intervalMs: 1000,
	});
	const dispatch = useDispatch();
	const isOpen = useSelector((state: RootState) => state?.loader?.open);
	useEffect(() => {
		if (isOpen && count === 0) {
			dispatch(setLoader(false));
			resetCountdown();
		}
	}, [count]);
	useEffect(() => {
		if (isOpen) {
			startCountdown();
		}
	}, [isOpen]);
	return (
		<Modal
			isOpen={isOpen}
			size='xs'
			alignItems='center'
			justifyContent='center'>
			<Modal.Content
				maxH={300}
				maxW={Dimensions.get('screen').width * 0.5}
				alignItems='center'
				justifyContent='center'
				backgroundColor={'transparent'}>
				<Modal.Body
					alignItems='center'
					justifyContent='center'
					backgroundColor={'rgba(111, 125, 137, .4)'}
					py={10}
					width={Dimensions.get('screen').width * 0.5}>
					<LottieView
						source={loading}
						style={{ height: 220, width: 220, alignSelf: 'center' }}
						loop
						autoPlay
					/>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default LoadingModal;
