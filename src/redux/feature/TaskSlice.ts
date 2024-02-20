/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TodoList } from '../../type';
import { filter } from 'lodash';
type initialStateProps = {
	todos: TodoList[];
};
const initialState = {
	todos: [],
} as initialStateProps;

const slice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setAddTodos: (state, action: PayloadAction<TodoList>) => {
			const todos = [...state.todos, action.payload];
			return { ...state, todos };
		},
		setRemoveTodos: (state, action) => {
			const todos = filter(
				state?.todos,
				(el: TodoList) => el?._id !== action.payload
			);
			return { ...state, todos };
		},
		setAddComment: (state, action) => {
			const newTodoes = state?.todos?.map((data) => {
				if (data?._id === action?.payload?._id) {
					const comments = [...(data?.comment || []), action?.payload?.comment];
					return { ...data, comment: comments };
				}
				return data;
			});
			return { ...state, todos: newTodoes };
		},
		setUpdateStatus: (state, action) => {
			const newTodoes = state?.todos?.map((data) => {
				if (data?._id === action?.payload?._id) {
					return { ...data, status: action?.payload?.status };
				}
				return data;
			});
			return { ...state, todos: newTodoes };
		},
		setUpdateTodo: (state, action) => {
			const newTodoes = state?.todos?.map((data) => {
				if (data?._id === action?.payload?._id) {
					return { ...data, ...action?.payload.todo };
				}
				return data;
			});
			return { ...state, todos: newTodoes };
		},
	},
});
export const {
	setAddTodos,
	setRemoveTodos,
	setAddComment,
	setUpdateStatus,
	setUpdateTodo,
} = slice.actions;
export default slice.reducer;
