/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { find } from 'lodash';
import { UserType } from '../../type';
import { setAuthPayloadToken } from '../../service/authService';
type initialStateProps = {
	users: UserType[];
	auth: UserType | null;
};
const initialState = {
	users: [],
	auth: null,
} as initialStateProps;

const slice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setAddUser: (state, action) => {
			const { username } = action.payload;
			const isAlreadyExist = find(
				state?.users,
				(el: UserType) => el?.username === username
			);
			let users = [...state.users];
			if (!isAlreadyExist) {
				setAuthPayloadToken(action.payload);
				users = [...users, action.payload];
				return { ...state, users, auth: action.payload };
			}
			throw new Error('User Already Exist');
		},
		setAuthUser(state, action) {
			setAuthPayloadToken(action.payload);
			return { ...state, auth: action.payload };
		},
	},
});

export const { setAddUser, setAuthUser } = slice.actions;

export default slice.reducer;

export const userType = (state: RootState) => state.users;
