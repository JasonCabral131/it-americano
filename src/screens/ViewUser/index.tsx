/** @format */

import React from 'react';
import BaseScreen from '../../components/BaseScreen';
import { useRoute } from '@react-navigation/native';
import PrimaryTabView from '../../components/PrimaryTabView';
import Tasklist from '../Home/MyTask/Tasklist';
import Header from '../../components/Header';

const ViewUser = () => {
	const userId = ((useRoute().params as { _id: string }) || {})?._id;
	return (
		<BaseScreen>
			<Header />
			<PrimaryTabView
				content={[
					{
						title: 'New',
						content: (
							<Tasklist
								status='new'
								userId={userId}
							/>
						),
					},
					{
						title: 'Developing',
						content: (
							<Tasklist
								status='developing'
								userId={userId}
							/>
						),
					},
					{
						title: 'Review',
						content: (
							<Tasklist
								status='review'
								userId={userId}
							/>
						),
					},
					{
						title: 'Complete',
						content: (
							<Tasklist
								status='complete'
								userId={userId}
							/>
						),
					},
				]}
			/>
		</BaseScreen>
	);
};

export default ViewUser;
