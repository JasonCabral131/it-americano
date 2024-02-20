/** @format */

import React, { useCallback, useState } from 'react';
import BaseScreen from '../../../components/BaseScreen';
import DashboardHeader from './DashboardHeader';
import { FlatList, VStack } from 'native-base';
import Search from './Search';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { hitSlop } from '../../../utils';
import colors from '../../../constant/colors';
import NewTaskButton from '../components/NewTaskButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { filter, isArray } from 'lodash';
import { TodoList } from '../../../type';
import TodoItem from '../../../components/TodoItem';
import FilterPriority from './FilterPriority';

const Dashboard = () => {
	let todos = useSelector((state: RootState) => state?.todos.todos);
	todos = isArray(todos) ? todos : [];
	const [search, setSearch] = useState('');
	const [priority, setPriority] = useState('');
	const renderItem = useCallback(({ item }: { item: TodoList }) => {
		return <TodoItem item={item} />;
	}, []);
	const [showPriority, setShowPriority] = useState(false);

	const isEqualLowerCase = (val: string, compare: string) => {
		return val.toLowerCase().includes(compare.toLowerCase());
	};
	if (search) {
		todos = filter(
			todos,
			(el: TodoList) =>
				isEqualLowerCase(el?.title || '', search) ||
				isEqualLowerCase(el?.content || '', search)
		);
	}
	if (priority) {
		todos = filter(todos, (el: TodoList) =>
			isEqualLowerCase(el?.priority || '', priority)
		);
	}
	return (
		<BaseScreen>
			<VStack
				position={'relative'}
				flex={1}
				px={2}>
				<DashboardHeader />
				<Search
					value={search}
					setValue={setSearch}
					renderRightContent={
						<TouchableOpacity
							hitSlop={hitSlop}
							onPress={() => setShowPriority((prev) => !prev)}>
							<FontAwesome5
								name='tasks'
								size={20}
								color={colors.secondaryBlack}
							/>
						</TouchableOpacity>
					}
				/>
				{showPriority ? (
					<FilterPriority
						onPress={(val) => {
							setShowPriority((prev) => !prev);
							setPriority(val);
						}}
					/>
				) : null}
				<FlatList
					mt={4}
					data={todos}
					renderItem={renderItem}
					initialNumToRender={10}
					flex={1}
					keyExtractor={(item) => item?._id.toString()}
				/>
				<NewTaskButton />
			</VStack>
		</BaseScreen>
	);
};

export default Dashboard;
