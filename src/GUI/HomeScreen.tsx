import React, { Component } from "react";
import {
    SafeAreaView,
    Button,
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import ServerProxy from "../Network/ServerProxy"
export default class LoadElements extends Component<any, any> {
    ServerProxyInstance = new ServerProxy();
    state = this.ServerProxyInstance.getItemsByCategory('PLASTIC_AND_BOTTLE')
    renderItem = ({ item }) => {
        console.log("render item")
        console.log(this.state)
        console.log(this.state)
        return (
            <View style={styles.listitem}>
                <Text style={styles.textStyle}>{item.title}</Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => this.decreaseValue(item.id)}>
                        <EntypoIcon name="minus" style={styles.icon}></EntypoIcon>
                    </TouchableOpacity>
                    <Text style={styles.counterTextStyle}> {item.quantity} </Text>
                    <TouchableOpacity onPress={() => this.increaseValue(item.id)}>
                        <EntypoIcon name="plus" style={styles.icon}></EntypoIcon>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    increaseValue = id => {
        console.log(id)
        const newData = this.state.data.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
        this.setState({ data: newData });
    };

    decreaseValue = id => {
        const newData = this.state.data.map(item => {
            if (item.id === id) {
                console.log(item.id)
                return {
                    ...item,
                    quantity: item.quantity > 0 ? item.quantity - 1 : 0
                };
            }
            return item;
        });
        this.setState({ data: newData });
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
                <View style={styles.buttonStyle}>
                    <Button
                        //onPress={this.buttonClickListener}
                        title="Emit Inv"
                        color="#FF3D00"
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    listitem: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    counter: {
        padding: 20,
        height: 37,
        width: 120,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    textStyle: {
        fontSize: 25,
    },
    icon: {
        top: 5,
        left: 0,
        position: "relative",
        color: "rgba(128,128,128,1)",
        fontSize: 40,
        height: 37,
        width: 40
    },
    counterTextStyle: {
        height: 37,
        width: 40,
        position: "relative",
        fontSize: 30,
        textAlign: "center"
    },
    buttonStyle: {
        width: "90%", margin: 10, backgroundColor: "red"
    }
});