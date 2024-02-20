/** @format */

import React, { useCallback, useState } from 'react';
import { Box, HStack, Text } from 'native-base';
import colors from '../../constant/colors';
import { TodoList } from '../../type';
import UserHeaderDetails from '../Users/UserHeaderDetails';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { setRemoveTodos, setUpdateStatus } from '../../redux/feature/TaskSlice';
import { hitSlop } from '../../utils';
import RenderHtml from 'react-native-render-html';

import { Fonts } from '../../constant/fonts';
import BadgeStatus from './BadgeStatus';
import { useNavigation } from '@react-navigation/native';

import StatusModal from '../../screens/TodoInfo/StatusModal';
type props = {
	item: TodoList;
	onStatusUpdate?: (status: string) => void;
};
const TodoItem: React.FC<props> = ({ item, onStatusUpdate = () => {} }) => {
	const handlPresent = useCallback(() => {}, []);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const handleDeleteTodos = useCallback((id: string) => {
		dispatch(setRemoveTodos(id));
	}, []);
	const [showStatus, setStatusModal] = useState(false);

	const handleNavigate = () => {
		navigation.navigate('TodoInfo', {
			data: item,
		});
	};
	const handleUpdateStatus = (status: string) => {
		dispatch(setUpdateStatus({ _id: item?._id, status }));
		setStatusModal(false);
		onStatusUpdate(status);
	};
	const handleTodo = () => {
		navigation.navigate('UpdateTodo', {
			initialTodo: {
				title: item?.title,
				content: item?.content,
				assignedUser: item?.assignedUser,
				priority: item?.priority,
				status: item?.status,
				_id: item?._id,
			},
		});
	};
	return (
		<Box
			justifyContent={'center'}
			alignItems={'center'}
			mt={1}
			pb={2}>
			<TouchableWithoutFeedback onPress={handleNavigate}>
				<Box
					bgColor={colors.white}
					shadow={4}
					width={'95%'}
					px={3}
					py={4}>
					<HStack
						justifyContent={'space-between'}
						alignItems={'center'}>
						<UserHeaderDetails
							onPressAvatar={() => {
								navigation.navigate('ViewUser', {
									_id: item?.assignedUser?._id,
								});
							}}
							handlePresent={handlPresent}
							currentUsername={item?.assignedUser?.username}
						/>
						<HStack
							justifyContent={'flex-end'}
							alignItems={'center'}
							space={2}>
							<TouchableOpacity
								hitSlop={hitSlop}
								onPress={() => handleDeleteTodos(item?._id)}>
								<Entypo
									name='trash'
									color={colors.danger}
									size={22}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								hitSlop={hitSlop}
								onPress={handleTodo}>
								<Entypo
									name='edit'
									color={colors.primary}
									size={22}
								/>
							</TouchableOpacity>
						</HStack>
					</HStack>
					<HStack
						mt={2}
						justifyContent={'space-between'}>
						<Box>
							<Text fontFamily={Fonts.gilroy.medium}>Status:</Text>
							<BadgeStatus
								status={item?.status}
								onPress={() => setStatusModal(!showStatus)}
							/>
						</Box>
						<Box justifyContent={'flex-end'}>
							<Text fontFamily={Fonts.gilroy.medium}>Priority:</Text>
							<Text
								fontFamily={Fonts.gilroy.semiBold}
								color={colors.secondaryBlack}
								fontSize={'sm'}>
								{item?.priority}
							</Text>
						</Box>
					</HStack>
					<Box mt={2}>
						<Text
							fontFamily={Fonts.gilroy.bold}
							fontSize={'lg'}
							color={colors.secondaryBlack}>
							Task title
						</Text>
						<Text
							fontFamily={Fonts.gilroy.bold}
							fontSize={'md'}>
							{item?.title}
						</Text>
						<Box mt={2}>
							<RenderHtml
								source={{
									html: item?.content,
								}}
							/>
						</Box>
					</Box>
				</Box>
			</TouchableWithoutFeedback>
			{showStatus ? (
				<StatusModal handleUpdateStatus={handleUpdateStatus} />
			) : null}
		</Box>
	);
};

export default React.memo(TodoItem);
