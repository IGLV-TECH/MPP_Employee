import {
    AppRegistry
} from 'react-native';
import HomeScreen from './src/GUI/HomeScreen'
import QrCodeScanner from "./src/GUI/QrCodeScanner";



AppRegistry.registerComponent(
    'MyReactNativeApp',
    () => HomeScreen
);