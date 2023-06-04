import {
    AppRegistry
} from 'react-native';
import HomeScreen from './src/GUI/HomeScreen'
import QrCodeScanner from "./src/GUI/QrCodeScanner";
import LoadLogin from "./src/GUI/Login"

import { NavigationContainer } from '@react-navigation/native';

AppRegistry.registerComponent(
    'HomeScreen',
    () => HomeScreen
);

AppRegistry.registerComponent(
    'QrCodeScanner',
    () => QrCodeScanner
);

AppRegistry.registerComponent(
    'LoadLogin',
    () => LoadLogin
);