import React, { useState, useEffect } from 'react';


export default class LoadElements {
    getItemsByCategory = async(category) => {
        let url = 'http://localhost:8080/items/findAllByCategory?categoryType=' + category;
        //let url = 'https://raw.githubusercontent.com/IGLV-TECH/Mocks-HTTPS/main/ItemsPlasticAndBottle.html'
        try {
            console.log(url);
            let response = await fetch(
                url, {mode: 'cors'}
            );
            let data = await response.json();
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

        let url = 'http://localhost:8080/invoices';
        console.log(requestOptions.body)
        try {
            let response = await fetch(url, requestOptions);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

}
