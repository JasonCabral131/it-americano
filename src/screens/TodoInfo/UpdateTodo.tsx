/** @format */

import React, { useCallback, useRef, useState } from 'react';
import BaseScreen from '../../components/BaseScreen';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Box, Button, HStack, Input, Text, useToast } from 'native-base';
import { Fonts } from '../../constant/fonts';
import colors from '../../constant/colors';
import { capitalize } from 'lodash';
import AssignedAndPriority from '../Home/components/AssignedAndPriority';
import {
	actions,
	RichEditor,
	RichToolbar,
} from 'react-native-pell-rich-editor';
import Header from '../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateTodoType, UserType } from '../../type';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AppBottomModal from '../../components/AppBottomModal';
import Users from '../../components/Users';
import BadgeStatus from '../../components/TodoItem/BadgeStatus';
import StatusModal from './StatusModal';
import { useDispatch } from 'react-redux';
import { setUpdateTodo } from '../../redux/feature/TaskSlice';
import ToastBox from '../../components/ToastBox';
const UpdateTodo = () => {
	const { initialTodo }: any = useRoute().params || {};
	const richText = useRef(null);
	const [task, setTask] = useState<CreateTodoType>(initialTodo);
	const [showStatus, setStatusModal] = useState(false);
	const navigation = useNavigation();
	const toast = useToast();
	const dispatch = useDispatch();
	const bottomRef = useRef<BottomSheetModal>(null);
	const handleSetTask = useCallback((value: string | UserType, key: string) => {
		setTask((prev) => ({ ...prev, [key]: value }));
	}, []);
	const handleSubmit = () => {
		console.log('_id', task?._id);
		dispatch(
			setUpdateTodo({
				_id: task?._id,
				todo: {
					priority: task?.priority,
					content: task?.content,
					status: task?.status,
					updatedAt: new Date().toISOString(),
					assignedUser: task?.assignedUser,
				},
			})
		);
		toast.show({
			render(props: { _id: number }) {
				return (
					<ToastBox
						msg='Updated Successfully!'
						type='success'
						onClose={() => toast.close(props?._id)}
					/>
				);
			},
			duration: 3000,
			placement: 'top',
		});
		navigation.navigate('Home');
	};
	return (
		<BaseScreen>
			<Header />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<Box flex={1}>
					<Box px={3}>
						<Input
							fontFamily={Fonts.gilroy.semiBold}
							placeholderTextColor={colors.black}
							borderWidth={0}
							borderBottomColor={'transparent'}
							multiline
							_input={{
								backgroundColor: 'transparent',
								fontFamily: Fonts.gilroy.semiBold,
							}}
							value={capitalize(task.title)}
							onChangeText={(value) => handleSetTask(value, 'title')}
							bgColor={'white'}
							focusOutlineColor={'transparent'}
							fontSize={'lg'}
							placeholder='Task name...'
							focusable
						/>
						<AssignedAndPriority
							setPriority={(val) => handleSetTask(val, 'priority')}
							priority={task?.priority}
							currentUser={task?.assignedUser}
							handlePresent={() => bottomRef.current?.present()}
						/>
						<HStack
							mt={2}
							justifyContent={'space-between'}>
							<BadgeStatus
								status={task?.status as string}
								onPress={() => setStatusModal(!showStatus)}
							/>
						</HStack>
					</Box>
					<Box mt={2} />
					<RichToolbar
						editor={richText}
						actions={[
							actions.setBold,
							actions.setItalic,
							actions.insertBulletsList,
							actions.insertOrderedList,
							actions.insertLink,
							actions.insertLine,
							actions.heading1,
							actions.code,
							actions.blockquote,
							actions.undo,
						]}
						selectedIconTint={colors.primary}
					/>
					<Box
						px={3}
						flex={1}>
						<Box flex={1}>
							<RichEditor
								ref={richText}
								onChange={(value) => {
									handleSetTask(value, 'content');
								}}
								initialContentHTML={task.content}
								placeholder='Description'
								style={{ marginTop: 5, maxHeight: 200 }}
							/>
						</Box>
						<Button
							rounded={'full'}
							mt={2}
							_pressed={{ opacity: 0.5 }}
							bgColor={colors.primary}
							mb={2}
							onPress={handleSubmit}>
							<Text
								fontSize={'md'}
								fontFamily={Fonts.gilroy.bold}
								color={colors.white}>
								Update
							</Text>
						</Button>
					</Box>
					{showStatus ? (
						<StatusModal
							handleUpdateStatus={(val) => {
								setStatusModal(false);
								handleSetTask(val, 'status');
							}}
						/>
					) : null}
				</Box>
			</TouchableWithoutFeedback>

			<Box />

			<AppBottomModal
				ref={bottomRef}
				snapPoints={['80%']}>
				<Users
					onPress={(val) => {
						handleSetTask(val, 'assignedUser');
						bottomRef.current?.dismiss();
					}}
					onBack={() => {
						bottomRef.current?.dismiss();
					}}
				/>
			</AppBottomModal>
		</BaseScreen>
	);
};

export default UpdateTodo;
