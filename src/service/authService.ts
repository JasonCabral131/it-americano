/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../type';

const getUser = async (): Promise<UserType | null> => {
	let user = await AsyncStorage.getItem('@user');
	user = user ? JSON.parse(user) : null;
	return user as UserType | null;
};
const setAuthPayloadToken = async (user: UserType) => {
	return await AsyncStorage.setItem('@user', JSON.stringify(user));
};

export { getUser, setAuthPayloadToken };
