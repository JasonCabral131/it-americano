/** @format */

import { find } from 'lodash';
import { store } from '../redux/store';
import { LoginType, UserType } from '../type';
import { setAuthPayloadToken } from './authService';

const login = (data: LoginType) => {
	const users = [...store.getState().users.users] as UserType[];
	console.log(users);
	const { username, password } = data;
	const isUserNameExist = find(
		users,
		(el: UserType) => el?.username === username
	);
	if (isUserNameExist) {
		if (isUserNameExist.password === password) {
			setAuthPayloadToken(isUserNameExist);
			const auth = isUserNameExist;
			return auth;
		}
		throw new Error('Invalid password');
	}
	throw new Error('Username not found');
};

export { login };
