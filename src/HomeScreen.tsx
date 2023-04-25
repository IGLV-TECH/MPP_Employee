import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

export const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Merge si pe browser in homepage</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});