import React, { useState, useEffect } from 'react';

export default class LoadElements {
    getItemsByCategory = async(props) => {
        let url = 'http://localhost:8080/items/findAllByCategory?categoryType=' + props.category;
        try {
            console.log(url)
            let response = await fetch(
                url, {mode: 'cors'}
            )
            let data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("Fault!")
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
