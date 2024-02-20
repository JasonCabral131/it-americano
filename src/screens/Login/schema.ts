/** @format */

import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
	username: Yup.string()
		.trim()
		.max(40, 'Username must be at most 40 characters')
		.required('Username is required'),
	password: Yup.string()
		.trim()
		.max(40, 'Password must be at most 40 characters')
		.required('Password is required'),
});
