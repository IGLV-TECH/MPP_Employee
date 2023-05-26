import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrCodeScanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [text, setText] = useState('Scan');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    };

    // Request Camera Permission
    useEffect(() => {
        //the following line is to skip qr code scan
        navigation.replace('HomeScreen', { category: 'PLASTIC_AND_BOTTLE', idClient: 1, idEmployee: 1 });
        askForCameraPermission();
    }, []);

    const parseString = (inputString) => {
        const commaIndex = inputString.indexOf(',');

        if (commaIndex !== -1) {
            const category = inputString.slice(0, commaIndex).trim();
            const idClient = inputString.slice(commaIndex + 1).trim();

            return { category, idClient };
        }

        // If no comma found, return empty values or handle the case accordingly
        return { category: '', idClient: '' };
    };


    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        const { category, idClient } = parseString(data);
        console.log('Type: ' + category + '\nID_CLient: ' + idClient);
        navigation.replace('HomeScreen', { category: 'PLASTIC_AND_BOTTLE', idClient: 1, idEmployee: 1 });
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button
                    title={'Allow Camera'}
                    onPress={() => askForCameraPermission()}
                />
            </View>
        );
    }

    // Return the View
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
            <Text style={styles.maintext}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },
});
