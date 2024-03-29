import React, { Component } from 'react';
import {
    SafeAreaView,
    Button,
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ServerProxy from '../Network/ServerProxy';
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;

export default class LoadElements extends Component<any, any> {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.category = props.route.params.category;
        this.idEmployee = props.route.params.idEmployee;
        this.idClient = props.route.params.idClient;
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
        let data = await this.ServerProxyInstance.getItemsByCategory(this.category);
        this.initialize_quantity(data);
    }

    renderItem = ({ item }) => {
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
        this.navigation.replace('QrCodeScanner');
    };

    render() {
        console.log("render");
        return (
            <SafeAreaView style={styles.container}>
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
                            <EntypoIcon name="minus" style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.counterTextStyle}>{this.state.penalty.quantity}</Text>
                        <TouchableOpacity onPress={() => this.increasePenalty()}>
                            <EntypoIcon name="plus" style={styles.icon} />
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
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    icon: {
        fontSize: 20,
        color: 'black',
        marginHorizontal: 8,
    },
    counterTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
});
