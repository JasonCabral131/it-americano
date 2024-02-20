/** @format */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import colors from './src/constant/colors';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { LogBox } from 'react-native';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

console.warn = () => {
	return '';
};
console.error = () => {
	return '';
};
LogBox.ignoreAllLogs();

const App = () => {
	const [fontsLoaded, fontError] = useFonts({
		'Gilroy-Bold': require('./src/assets/Fonts/Gilroy-Bold.otf'),
		'Gilroy-BoldItalic': require('./src/assets/Fonts/Gilroy-BoldItalic.otf'),
		'Gilroy-Medium': require('./src/assets/Fonts/Gilroy-Medium.otf'),
		'Gilroy-MediumItalic': require('./src/assets/Fonts/Gilroy-MediumItalic.otf'),
		'Gilroy-SemiBold': require('./src/assets/Fonts/Gilroy-SemiBold.otf'),
		'Gilroy-SemiBoldItalic': require('./src/assets/Fonts/Gilroy-SemiBoldItalic.otf'),
	});
	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
				backgroundColor: colors.white,
			}}>
			<Provider store={store}>
				<PersistGate
					loading={null}
					persistor={persistor}>
					<NativeBaseProvider>
						<BottomSheetModalProvider>
							<NavigationContainer>
								<Routes />
							</NavigationContainer>
						</BottomSheetModalProvider>
					</NativeBaseProvider>
				</PersistGate>
			</Provider>
		</GestureHandlerRootView>
	);
};

export default App;
