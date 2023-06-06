import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, NativeModules } from 'react-native';
import ServerProxy from "../Network/ServerProxy";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default function LoadLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredential, setInvalidCredentials] = useState(false);

    var ServerProxyInstance = new ServerProxy();
    const handleLogin = async () => {
        var response = await ServerProxyInstance.login(username, password);

        if(response == 'Invalid credentials'){
            setInvalidCredentials(true);
            return;
        }

        var token = response.token;
        var idEmployee = response.employee.id.toString();
        console.log("from react native full login response: ", response);
        await delay(400);
        NativeModules.PageChanger.loadQRScanner(token, idEmployee);
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
            {invalidCredential && <Text style={styles.invalidCredentialsText}>Invalid username/password!</Text>}
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
