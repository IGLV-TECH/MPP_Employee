import React, { useState, useEffect } from 'react';

export default class LoadElements {
    getItemsByCategory = async(category) => {
        try {
            let response = await fetch(
                'http://localhost:8080/items/findAllByCategory?categoryType=PLASTIC_AND_BOTTLE'
            );
            let data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }

    };

    sendInvoice = async (invoice) => {
        console.log("creating fuckin' invoice");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoice)
        };
        //try {
        // let response = await fetch(
        //      'https://reqres.in/api/posts', requestOptions
        //  );
        //}
        //catch (error) {
        //     console.error(error);
        // }
    };
}
