import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, NativeModules } from 'react-native';
import ServerProxy from "../Network/ServerProxy";

export default function LoadLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var ServerProxyInstance = new ServerProxy();
    const handleLogin = async () => {
        var response = await ServerProxyInstance.login(username, password);
        var token = response.token;
        var idEmployee = response.employee.id.toString();
        console.log("from react native token: ", token);
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
            <Button title="Login" onPress={handleLogin} />
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
});
