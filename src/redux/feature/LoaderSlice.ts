/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
	open: false;
}

export const loaderSlice = createSlice({
	name: 'home',
	initialState: {
		open: false,
	} as LoaderState,
	reducers: {
		setLoader(state, action: PayloadAction<any>) {
			return { ...state, open: action.payload };
		},
	},
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
