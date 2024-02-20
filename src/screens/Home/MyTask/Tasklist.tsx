/** @format */

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { capitalize, filter } from 'lodash';
import { TodoList } from '../../../type';
import { FlatList, Text, VStack } from 'native-base';
import TodoItem from '../../../components/TodoItem';
import { Fonts } from '../../../constant/fonts';
type props = {
	status: string;
	userId: string;
};
const Tasklist: React.FC<props> = ({ status, userId }) => {
	const todos = useSelector((state: RootState) => state?.todos.todos);
	const myTodos = filter(
		todos,
		(el: TodoList) => el?.assignedUser?._id === userId && el?.status === status
	);
	const renderItem = useCallback(({ item }: { item: TodoList }) => {
		return <TodoItem item={item} />;
	}, []);
	return (
		<VStack
			flex={1}
			px={2}>
			<Text
				mt={4}
				fontFamily={Fonts.gilroy.bold}>
				Total {capitalize(status) + ': ' + myTodos?.length}
			</Text>
			<FlatList
				mt={4}
				data={myTodos}
				renderItem={renderItem}
				initialNumToRender={10}
				flex={1}
				keyExtractor={(item) => item?._id.toString()}
			/>
		</VStack>
	);
};

export default Tasklist;
