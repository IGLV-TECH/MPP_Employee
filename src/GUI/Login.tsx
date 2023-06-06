import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import ServerProxy from "../Network/ServerProxy";
import {conditionMatchesFile} from "@expo/webpack-config/utils";
import constructWithOptions from "styled-components/native/dist/constructors/constructWithOptions";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);


export default function LoadLogin({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredential, setInvalidCredentials] = useState(false);

    const handleNetworkError = () => {
        Alert.alert(
            'Network error',
            `Please verify your network connection`,
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                },
            ],
            { cancelable: false }
        );
    }
    var ServerProxyInstance = new ServerProxy();
    const handleLogin = async () => {
        var response = await ServerProxyInstance.login(username, password);
        console.log("login response in frontend")
        if(response == 'Network error'){
            console.log('Create error popup')
            Alert.alert(
                'Network error',
                `Please verify your network connection`,
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    },
                ],
                { cancelable: false }
            );
            console.log('Create error popup')
            return;
        }

        if(response == 'Invalid credentials'){
            setInvalidCredentials(true);
            return;
        }

        var token = response.token;
        console.log(token)
        setInvalidCredentials(false);
        navigation.replace('HomeScreen', { token: token, category: 'PLASTIC_AND_BOTTLE', idClient: 1, idEmployee: 1 });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EcoWin</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} color="#FF3D00"/>
            {invalidCredential && <Text style={styles.invalidCredentialsText}>Invalid credentials!</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    invalidCredentialsText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});
