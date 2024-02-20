/** @format */

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './route';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import TransparentModal from '../screens/Modal/TransparentModal';
import LoadingModal from '../components/LoadingModal';
import TodoInfo from '../screens/TodoInfo';
import ViewUser from '../screens/ViewUser';
import UpdateTodo from '../screens/TodoInfo/UpdateTodo';
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
	return (
		<>
			<LoadingModal />
			<Stack.Navigator
				initialRouteName='Splash'
				screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name='Splash'
					component={Splash}
				/>
				<Stack.Screen
					name='Login'
					component={Login}
				/>
				<Stack.Screen
					name='Home'
					component={Home}
				/>
				<Stack.Screen
					name='TransparentModal'
					component={TransparentModal}
					options={{
						presentation: 'transparentModal',
						animation: 'fade',
					}}
				/>
				<Stack.Screen
					name='TodoInfo'
					component={TodoInfo}
				/>
				<Stack.Screen
					name='ViewUser'
					component={ViewUser}
				/>
				<Stack.Screen
					name='UpdateTodo'
					component={UpdateTodo}
				/>
			</Stack.Navigator>
		</>
	);
};

export default React.memo(Routes);
