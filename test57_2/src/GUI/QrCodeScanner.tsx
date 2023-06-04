import React, { useState, useEffect } from 'react';
import { AppRegistry, View, Text, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import LoadElements from "./HomeScreen";

export default function QrCodeScanner() {
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');

    useEffect(() => {
        // Request Camera Permission
        const askForCameraPermission = async () => {
            // const { status } = await RNCamera.requestPermissionsAsync();
            // if (status === 'granted') {
            setScanned(false);
            // }
        };
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setScannedData(data);
        showAlert(data);
    };

    const showAlert = (data) => {
        Alert.alert(
            'QR Code Scanned',
            `Content: ${data}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setScanned(false);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
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
        backgroundColor: '#000',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    scanText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});
