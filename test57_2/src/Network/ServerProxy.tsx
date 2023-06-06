import React, { useState, useEffect } from 'react';
import {Alert, NativeModules} from "react-native";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default class LoadElements {
    ipAddress = "192.168.139.163";
    login = async(email, password) => {
        let url = 'http://' + this.ipAddress + ':8080/employees/login';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };
        try {
            let response = await fetch(url, requestOptions);
            console.log("login response")
            console.log(response)
            let data = await response.json();
            if(response.status === 401)
                return 'Invalid credentials'
            return data;
        } catch (error) {
            console.log("login response: ");
            console.log(error);
            return 'Network error';
        }
    }

    logout = async() => {
        let url = 'http://' + this.ipAddress + ':8080/employees/logout';
        NativeModules.PageChanger.readFromFile('token', async(token) => {
            this.token = await token;
            console.log("token in react native is ");
            console.log(this.token);
        });
        await delay(400);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            mode: 'cors',
        };
        try {
            let response = await fetch(url, requestOptions);
            let data = await response.json();
            return data;
        } catch (error) {
            this.handleNetworkError();
        }
    }

    getItemsByCategory = async(category) => {
        let url = 'http://' + this.ipAddress + ':8080/items/findAllByCategory?categoryType=' + category;
        NativeModules.PageChanger.readFromFile('token', async(token) => {
                this.token = await token;
                console.log("token in react native is ");
                console.log(this.token);
        });
        await delay(400);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            mode: 'cors',
        };
        try {
            console.log(url);
            let response = await fetch(
                url, requestOptions
            );
            let data = await response.json();
            return data;
        } catch (error) {
            this.handleNetworkError();
        }
    };

    sendInvoice = async (body) => {
        NativeModules.PageChanger.readFromFile('token', async(token) => {
            this.token = await token;
            console.log("token in react native is ");
            console.log(this.token);
        });
        await delay(400);
        console.log("from react, token in getItems");
        console.log(this.token);

        console.log(body.items);
        const newData = body.items.map((item) => {
            return {
                "id": item.id,
                "number": item.quantity
            };
        });
        console.log(newData);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            mode: 'cors',
            body: JSON.stringify({
                "idClient": body.idClient,
                "idEmployee": body.idEmployee,
                "categoryType": body.category,
                "penaltyPoints": body.penalty,
                "listItems": newData
            })
        };

        let url = 'http://' + this.ipAddress + ':8080/invoices';
        console.log("from react native add invoice ")
        console.log(requestOptions.body)
        try {
            let response = await fetch(url, requestOptions);
            console.log(response);
        } catch (error) {
            this.handleNetworkError();
        }
    };

}
