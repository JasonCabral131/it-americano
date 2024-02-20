/** @format */

import React, { useCallback, useState } from 'react';
import BaseScreen from '../../components/BaseScreen';
import { useRoute } from '@react-navigation/native';
import { CommentType, TodoList, UserType } from '../../type';
import Header from '../../components/Header';
import TodoItem from '../../components/TodoItem';
import { Box, FlatList, Input, Text } from 'native-base';
import { Fonts } from '../../constant/fonts';
import { Entypo } from '@expo/vector-icons';
import colors from '../../constant/colors';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddComment } from '../../redux/feature/TaskSlice';
import { RootState } from '../../redux/store';
import uuid from 'react-native-uuid';
import UserHeaderDetails from '../../components/Users/UserHeaderDetails';

const TodoInfo = () => {
	const item = ((useRoute().params as { data: TodoList }) || {})
		?.data as TodoList;
	const [currentItem, setCurrentItem] = useState(item);
	const user = useSelector((state: RootState) => state?.users.auth);
	const [commentList, setCommentList] = useState(item?.comment);
	const [comment, setComment] = useState('');
	const renderItemComment = useCallback(({ item }: { item: CommentType }) => {
		return (
			<Box mt={2}>
				<UserHeaderDetails
					currentUsername={item?.commentUser?.username}
					disableClicking={true}
					showAssigned={false}
					alignItems='flex-start'
				/>
				<Box
					borderBottomColor={colors.whiteGrey}
					borderBottomWidth={'1px'}
					mt={2}
					flexWrap={'wrap'}
					pl={4}>
					<Text
						color={colors.secondaryBlack}
						fontFamily={Fonts.gilroy.bold}>
						{item?.comment}
					</Text>
				</Box>
			</Box>
		);
	}, []);
	const dispatch = useDispatch();
	const handleComment = async () => {
		const commentInfo = {
			commentUser: user as UserType,
			comment,
			_id: uuid.v4() as string,
		};
		await dispatch(
			setAddComment({
				_id: item?._id,
				comment: commentInfo,
			})
		);
		setComment('');
		setCommentList((prev) => [...prev, commentInfo]);
	};
	return (
		<BaseScreen>
			<Header />
			<TodoItem
				item={currentItem}
				onStatusUpdate={(val) => {
					setCurrentItem((prev) => ({ ...prev, status: val as any }));
				}}
			/>
			<Box
				px={3}
				flex={1}
				mt={2}>
				<Text
					fontFamily={Fonts.gilroy.bold}
					fontSize={'xl'}>
					Comments:{' '}
				</Text>
				<FlatList
					flex={1}
					data={commentList}
					renderItem={renderItemComment}
					keyExtractor={(item) => item?._id?.toString()}
					initialNumToRender={10}
				/>

				<Box py={4}>
					<Input
						placeholder='comment here...'
						borderWidth={0}
						borderColor={'#F1F1F1'}
						rounded={'3xl'}
						py={2}
						value={comment}
						onChangeText={(val) => setComment(val)}
						backgroundColor={'#F1F1F1'}
						rightElement={
							<TouchableOpacity onPress={handleComment}>
								<Box pr={2}>
									<Entypo
										name='arrow-right'
										color={colors.secondaryBlack}
										size={25}
									/>
								</Box>
							</TouchableOpacity>
						}
					/>
				</Box>
			</Box>
		</BaseScreen>
	);
};

export default TodoInfo;
