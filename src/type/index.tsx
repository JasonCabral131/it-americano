/** @format */

export enum priority {
	new = 'new',
	developing = 'developing',
	review = 'review',
	complete = 'complete',
}
export type UserType = {
	_id: string;
	username: string;
	password: string;
	profile?: string;
	createdAt: string;
	updatedAt: string;
};

export type CommentType = {
	commentUser: UserType;
	comment: string;
	_id: string;
};
export type TodoList = {
	_id: string;
	creatorId: string;
	assignedUser: UserType;
	status: 'new' | 'developing' | 'review' | 'complete';
	priority: 'low' | 'medium' | 'high';
	title: string;
	content: string;
	comment: CommentType[];
	createdAt: string;
	updatedAt: string;
};
export type LoginType = {
	username: string;
	password: string;
};
export type CreateTodoType = {
	title: string;
	content: string;
	creatorId?: string;
	assignedUser: UserType;
	priority: string;
	_id?: string;
	status?: string;
};
