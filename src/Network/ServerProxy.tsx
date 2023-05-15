import React, { useState, useEffect } from 'react';

export default class LoadElements {
    getItemsByCategory = async(category) => {
        try {
            let response = await fetch(
                'https://raw.githubusercontent.com/IGLV-TECH/Mocks-HTTPS/main/Items.html'
            );
            let json = await response.json();
            console.log(json);
            return json;
        } catch (error) {
            console.log(error);
        }

    };
}
