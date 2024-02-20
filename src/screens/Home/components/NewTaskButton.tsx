/** @format */

import {
	Box,
	Button,
	HStack,
	Input,
	Pressable,
	Text,
	View,
	useToast,
} from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import colors from '../../../constant/colors';
import { Entypo } from '@expo/vector-icons';
import { Fonts } from '../../../constant/fonts';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AppBottomModal from '../../../components/AppBottomModal';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
	actions,
	RichEditor,
	RichToolbar,
} from 'react-native-pell-rich-editor';
import { capitalize } from 'lodash';
import AssignedAndPriority from './AssignedAndPriority';
import Users from '../../../components/Users';
import { setAddTodos } from '../../../redux/feature/TaskSlice';
import uuid from 'react-native-uuid';
import ToastBox from '../../../components/ToastBox';
import { CreateTodoType, TodoList, UserType } from '../../../type';
type props = {
	todoId?: string;
	todo?: TodoList;
	initialTodo?: CreateTodoType;
};
const NewTaskButton: React.FC<props> = ({ todo, todoId, initialTodo }) => {
	const modalRef = useRef<BottomSheetModal>(null);
	const user = useSelector((state: RootState) => state?.users?.auth);
	const richText = React.useRef(null);
	const [currentUser, setCurrentUser] = useState(todo?.assignedUser || user);
	const initialState = {
		title: '',
		content: '',
		creatorId: user?._id,
		assignedUser: user,
		priority: 'low',
	};

	const toast = useToast();
	const [task, setTask] = useState(initialTodo || initialState);
	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1) {
			modalRef.current?.dismiss();
		}
	}, []);
	const clearState = () => {
		setTask(initialState);
		modalRef.current?.dismiss();
	};
	const handlePresent = useCallback(() => {
		modalRef.current?.present();
	}, []);
	const handleSetTask = useCallback((value: string | UserType, key: string) => {
		setTask((prev) => ({ ...prev, [key]: value }));
	}, []);
	const bottomRef = useRef<BottomSheetModal>(null);

	const dispach = useDispatch();
	const handleSubmit = async () => {
		if (!task?.title) {
			return toast.show({
				render(props: { id: number }) {
					return (
						<ToastBox
							type='warning'
							msg='Task title is required'
							onClose={() => {
								toast.close(props.id);
							}}
						/>
					);
				},
				duration: 3000,
				placement: 'top',
			});
		}

		if (todoId) {
			return;
		}
		await dispach(
			setAddTodos({
				_id: uuid.v4() as string,
				title: task?.title,
				content: task.content,
				creatorId: task.creatorId as string,
				assignedUser: task.assignedUser as UserType,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				priority: task?.priority as any,
				status: 'new',
				comment: [],
			})
		);
		clearState();
		toast.show({
			render(props: { id: number }) {
				return (
					<ToastBox
						type='success'
						msg='Successfully Created'
						onClose={() => {
							toast.close(props.id);
						}}
					/>
				);
			},
			placement: 'top',
			duration: 3000,
		});
	};
	return (
		<>
			<View
				position={'absolute'}
				justifyContent={'flex-end'}
				pr={4}
				bottom={3}
				right={1}>
				<Pressable
					rounded={'full'}
					py={2}
					onPress={handlePresent}
					px={4}
					_pressed={{ opacity: 0.6 }}
					bgColor={colors.danger}>
					<HStack
						justifyContent={'center'}
						alignItems={'center'}>
						<Entypo
							name='plus'
							size={14}
							color={colors.white}
						/>
						<Text
							ml={2}
							fontFamily={Fonts.gilroy.medium}
							fontSize={'sm'}
							color={colors.white}>
							New task
						</Text>
					</HStack>
				</Pressable>
			</View>
			<AppBottomModal
				ref={modalRef}
				onChange={handleSheetChanges}
				snapPoints={['80%']}>
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
								currentUser={currentUser}
								handlePresent={() => bottomRef.current?.present()}
							/>
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
									Create
								</Text>
							</Button>
						</Box>
					</Box>
				</TouchableWithoutFeedback>
			</AppBottomModal>
			<AppBottomModal
				ref={bottomRef}
				snapPoints={['80%']}>
				<Users
					onPress={(val) => {
						handleSetTask(val, 'assignedUser');
						setCurrentUser(val);
						handlePresent();
						bottomRef.current?.dismiss();
					}}
					onBack={() => {
						handlePresent();
						bottomRef.current?.dismiss();
					}}
				/>
			</AppBottomModal>
		</>
	);
};

export default React.memo(NewTaskButton);
