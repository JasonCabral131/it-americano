/** @format */

import React from 'react';
import BaseScreen from '../../../components/BaseScreen';
import PrimaryTabView from '../../../components/PrimaryTabView';
import Tasklist from './Tasklist';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const MyTask = () => {
	const user = useSelector((state: RootState) => state?.users.auth);
	return (
		<BaseScreen>
			<PrimaryTabView
				content={[
					{
						title: 'New',
						content: (
							<Tasklist
								status='new'
								userId={user?._id as string}
							/>
						),
					},
					{
						title: 'Developing',
						content: (
							<Tasklist
								status='developing'
								userId={user?._id as string}
							/>
						),
					},
					{
						title: 'Review',
						content: (
							<Tasklist
								status='review'
								userId={user?._id as string}
							/>
						),
					},
					{
						title: 'Complete',
						content: (
							<Tasklist
								status='complete'
								userId={user?._id as string}
							/>
						),
					},
				]}
			/>
		</BaseScreen>
	);
};

export default MyTask;
