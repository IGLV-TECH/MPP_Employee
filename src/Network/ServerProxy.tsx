import React, { useState, useEffect } from 'react';

export default class LoadElements{
    getItemsByCategory = (category) =>{
        var state = {
            data: [
                {
                    id: '1',
                    title: "Paper",
                    quantity: 0
                },
                {
                    id: "2",
                    title: "Glass",
                    quantity: 0
                },
                {
                    id: "3",
                    title: "Cardboard",
                    quantity: 0
                }
            ]
        };
        return state;
    }

}