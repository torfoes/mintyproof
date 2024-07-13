'use client'

import React, {useState} from 'react';
import {execHaloCmdWeb} from '@arx-research/libhalo/api/web.js';

import {Button} from "@/components/ui/button";


const Page = () => {
    const [statusText, setStatusText] = useState('Click on the button');

    async function scanNFC() {
        let command = {
            name: "sign",
            keyNo: 1,
            message: "010203"
        };


        let res;

        try {
            // --- request NFC command execution ---
            const options = null; // no options

            res = await execHaloCmdWeb(command, options);
            // the command has succeeded, display the result to the user
            setStatusText(JSON.stringify(res, null, 4));
        } catch (e) {
            // the command has failed, display error to the user
            setStatusText('Error: ' + String(e));
        }
    }

    return (
        <div>
            <div>
                {statusText}
            </div>
            <Button onClick={scanNFC}>
                Start Scanning
            </Button>
        </div>
    );
};

export default Page;