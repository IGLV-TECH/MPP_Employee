import React, { useState, useEffect } from 'react';
import {NativeModules} from "react-native";

export default class LoadElements {
    getItemsByCategory = async(category) => {
        let url = 'http://192.168.139.163:8080/items/findAllByCategory?categoryType=' + category;
        try {
            console.log(url);
            let response = await fetch(
                url, {mode: 'cors'}
            );
            let data = await response.json();
            console.log("from react ")
            console.log(data);

            const {CalendarModule} = NativeModules;
            const {NonoModule} = NativeModules;
            CalendarModule.createCalendarEvent(
                'Party',
                'My House',
            );
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
