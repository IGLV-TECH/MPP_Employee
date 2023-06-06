import React, { Component } from 'react';
import {
    SafeAreaView,
    Button,
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    AppRegistry, Alert, NativeModules
} from 'react-native';
//import EntypoIcon from 'react-native-vector-icons/Entypo';
import ServerProxy from '../Network/ServerProxy';
//import {Simulate} from "react-dom/test-utils";
//import compositionStart = Simulate.compositionStart;

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default class LoadElements extends Component<any, any> {
    constructor(props) {
        super(props);
        let newPenalty = {
            id: 0,
            title: "Penalty",
            quantity: 0
        };
        this.state = {
            data: [],
            penalty: newPenalty
        };
    }

    ServerProxyInstance = new ServerProxy();

    async componentDidMount() {
        NativeModules.PageChanger.readFromFile('category', async(category) => {
            this.category = category;
            console.log("token in react native is ");
            console.log(this.category);
        });
        NativeModules.PageChanger.readFromFile('idClient', async(idClient) => {
            this.idClient = idClient;
            console.log("token in react native is ");
            console.log(this.idClient);
        });
        NativeModules.PageChanger.readFromFile('idEmployee', async(idEmployee) => {
            this.idEmployee = idEmployee;
            console.log("token in react native is ");
            console.log(this.idEmployee);
        });
        NativeModules.PageChanger.readFromFile('token', async(token) => {
            this.token = token;
            console.log("token in react native is ");
            console.log(this.token);
        });
        await delay(400);

        let data = await this.ServerProxyInstance.getItemsByCategory(this.category);
        this.initialize_quantity(data);
    }

    renderBackButton = () => {
        return (
            <TouchableOpacity onPress={this.goBack}>
                <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
        );
    };

    goBack = () => {
        NativeModules.PageChanger.loadQRScanner(this.token, this.idEmployee);
    };

    renderLogoutButton = () => {
        return (
            <TouchableOpacity onPress={this.handleLogout}>
                <Text style={styles.backButton}>Logout</Text>
            </TouchableOpacity>
        );
    };

    handleLogout = () => {
        let ServerProxyInstance = new ServerProxy();
        ServerProxyInstance.logout();
        NativeModules.PageChanger.loadLoginScreen();
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.listitem}>
                <Text style={styles.textStyle}>{item.title}</Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => this.decreaseValue(item.id)}>
                        <Text style={styles.counterTextStyle}> - </Text>
                    </TouchableOpacity>
                    <Text style={styles.counterTextStyle}> {item.quantity} </Text>
                    <TouchableOpacity onPress={() => this.increaseValue(item.id)}>
                        <Text style={styles.counterTextStyle}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    increaseValue = (id) => {
        const newData = this.state.data.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        this.setState({ data: newData });
    };

    decreaseValue = (id) => {
        const newData = this.state.data.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity > 0 ? item.quantity - 1 : 0,
                };
            }
            return item;
        });
        this.setState({ data: newData });
    };

    decreasePenalty = () => {
        let newPenalty = this.state.penalty;
        newPenalty.quantity = newPenalty.quantity - 1;
        this.setState({penalty: newPenalty})
    }

    increasePenalty = () => {
        let newPenalty = this.state.penalty;
        newPenalty.quantity = newPenalty.quantity + 1;
        this.setState({penalty: newPenalty})
    }

    initialize_quantity = (data) => {
        const newData = data.map((item) => {
            return {
                ...item,
                quantity: 0,
            };
        });
        this.setState({ data: newData });
    };

    clickEmitInvoice = () => {
        console.log(this.state.idClient)
        this.ServerProxyInstance.sendInvoice(
            {
                idClient: this.idClient,
                idEmployee: this.idEmployee,
                category: this.category,
                penalty: this.state.penalty.quantity,
                items: this.state.data
            }
        );
        this.goBack();
    };

    render() {
        console.log("render react page");
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    {this.renderBackButton()}
                    {this.renderLogoutButton()}
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={this.state.data}
                />
                <View style={styles.listitem}>
                    <Text style={styles.textStyle}>{this.state.penalty.title}</Text>
                    <View style={styles.counter}>
                        <TouchableOpacity onPress={() => this.decreasePenalty()}>
                            <Text style={styles.counterTextStyle}> - </Text>
                        </TouchableOpacity>
                        <Text style={styles.counterTextStyle}>{this.state.penalty.quantity}</Text>
                        <TouchableOpacity onPress={() => this.increasePenalty()}>
                            <Text style={styles.counterTextStyle}> + </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.clickEmitInvoice}
                        title="Emit Invoice"
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
        marginTop: 50,
    },
    listitem: {
        padding: 17,
        marginVertical: 4,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 8,
    },
    icon: {
        fontSize: 20,
        color: 'black',
        marginHorizontal: 8,
    },
    counterTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginHorizontal: 32,
        marginBottom: 32,
    },
    backButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 8,
    },
    logoutButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 8,
    },
    logoutButtonText: {
        color: '#000000',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
});