import React, { useState, useEffect } from 'react';
import {AppRegistry, View, Text, StyleSheet, Alert, NativeModules, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';
import LoadElements from "./HomeScreen";
import ServerProxy from "../Network/ServerProxy";


export default function QrCodeScanner() {
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const askForCameraPermission = async () => {
            setScanned(false);
        };
        askForCameraPermission();
    }, []);

    const parseString = (inputString) => {
        const commaIndex = inputString.indexOf(',');

        if (commaIndex !== -1) {
            const idClient = inputString.slice(0, commaIndex).trim();
            const category = inputString.slice(commaIndex + 1).trim();

            return { idClient, category };
        }

        return { idClient: '', category: '' };
    };

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        const { idClient, category } = parseString(data);

        console.log("from react");
        console.log(idClient, category);
        NativeModules.PageChanger.loadHomeScreen(idClient, category);
    };


    const handleLogout = () => {
        let ServerProxyInstance = new ServerProxy();
        ServerProxyInstance.logout();
        NativeModules.PageChanger.loadLoginScreen();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <RNCamera
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                onBarCodeRead={scanned ? null : handleBarCodeScanned}
            />
            {scanned && <Text style={styles.scanText}>QR Code scanned!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    camera: {
        width: '50%',
        height: '50%',
    },
    scanText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    logoutButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
