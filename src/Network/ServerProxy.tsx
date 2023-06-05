import React, { useState, useEffect } from 'react';
import {NativeModules} from "react-native";

export default class LoadElements {
    login = async(email, password) => {
        let url = 'http://192.168.139.163:8080/employees/login';
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
            let data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    getItemsByCategory = async(category, token) => {
        let url = 'http://192.168.139.163:8080/items/findAllByCategory?categoryType=' + category;
        console.log("from react");
        console.log(token);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',

        };
        try {
            console.log(url);
            let response = await fetch(
                url, requestOptions
            );
            let data = await response.json();
            console.log("from react ")
            console.log(data);
            return data;
        } catch (error) {
            console.log("Fault!")
            console.log(error);
        }

    };

    sendInvoice = async (body) => {
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
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                "client": body.idClient,
                "employee": body.idEmployee,
                "categoryType": body.category,
                "penaltyPoints": body.penalty,
                "listItems": newData
            })
        };

        let url = 'http://192.168.139.163:8080/invoices';
        console.log(requestOptions.body)
        try {
            let response = await fetch(url, requestOptions);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

}
