import React, { useState, useEffect } from 'react';

export default class LoadElements {
    getItemsByCategory = async(category) => {
        let state = {
            data: [
                {
                    id: '1',
                    title: 'Paper',
                    quantity: 0,
                },
                {
                    id: '2',
                    title: 'Glass',
                    quantity: 0,
                },
                {
                    id: '3',
                    title: 'Cardboard',
                    quantity: 0,
                },
            ],
        };
        try {
            let response = await fetch(
                'https://raw.githubusercontent.com/IGLV-TECH/Mocks-HTTPS/main/Items.html'
            );
            let json = await response.json();
            console.log("response:")
            console.log(json);
            return state;
        } catch (error) {
            console.log(error);
        }

    };
}
