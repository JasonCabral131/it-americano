/** @format */

import { CreateTodoType, TodoList } from '../type';

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;

	Splash: undefined;

	TransparentModal: {
		content: React.ReactElement;
		bgColor?: string;
		fullScreen?: boolean;
	};
	TodoInfo: {
		data: TodoList;
	};
	ViewUser: {
		_id: string;
	};
	UpdateTodo: {
		initialTodo: CreateTodoType;
	};
};
export type TabParamList = {
	Home: undefined;
	MyTask: undefined;
};
