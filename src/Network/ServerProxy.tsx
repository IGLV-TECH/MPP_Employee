import React, { useState, useEffect } from 'react';

export default class LoadElements {
    getItemsByCategory = async(category) => {
        try {
            let response = await fetch(
                'https://raw.githubusercontent.com/IGLV-TECH/Mocks-HTTPS/main/ItemsPaperAndCardboard.html'
            );
            let json = await response.json();
            console.log(json);
            return json;
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
