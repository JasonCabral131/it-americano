/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
} from 'redux-persist';
import UserSlice from './feature/UserSlice';
import loaderSlice from './feature/LoaderSlice';
import TaskSlice from './feature/TaskSlice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['users', 'todos'],
};

const rootReducer = combineReducers({
	users: UserSlice,
	loader: loaderSlice,
	todos: TaskSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(),
	devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
