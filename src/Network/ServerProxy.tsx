import React, { useState, useEffect } from 'react';

export default class LoadElements{
    getItemsByCategory = async (category) => {
        let state =  {
            data: [
                {
                    id: '1',
                    title: "Paper",
                    quantity: 0
                },
                {
                    id: "2",
                    title: "Glasso",
                    quantity: 0
                },
                {
                    id: "3",
                    title: "Cardboard",
                    quantity: 0
                }
            ]
        };
        console.log('http://localhost:8080/items/findAllByCategory?categoryType=' + category)
        try {
            let response = await fetch(
                'http://localhost:8080/items/findAllByCategory?categoryType=' + category
            );
            let json = await response.json();
            console.log(json)
        } catch (error) {
            console.error(error);
        }
        return state;
    };

}