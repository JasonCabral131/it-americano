/** @format */

import React from 'react';
import { Entypo, Feather } from '@expo/vector-icons';
import colors from '../../constant/colors';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import MyTask from './MyTask';

const Tab = createBottomTabNavigator();
const Home = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				headerShown: false,
				tabBarStyle: {
					height: 60,
					paddingTop: 5,
				},
			})}>
			<Tab.Screen
				name='Home'
				component={Dashboard}
				options={{
					tabBarLabelStyle: {
						fontSize: 16,
						fontWeight: 'bold',
					},
					tabBarIcon: ({ focused }) => {
						return (
							<Entypo
								name='home'
								size={24}
								color={focused ? colors.primary : colors.black}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name='My Task'
				component={MyTask}
				options={{
					tabBarLabelStyle: {
						fontSize: 16,
						fontWeight: 'bold',
					},
					tabBarIcon: ({ focused }) => {
						return (
							<Feather
								name='check-circle'
								size={24}
								color={focused ? colors.primary : colors.black}
							/>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default React.memo(Home);
