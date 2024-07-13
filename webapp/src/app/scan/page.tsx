'use client'

import React, { useState } from 'react';
import {execHaloCmdWeb} from '@arx-research/libhalo/api/web.js';
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'

interface Command {
    name: string;
    keyNo: number;
    message: string;
}

const Page: React.FC = () => {
    const { address, isConnected } = useWeb3ModalAccount()

    const [statusText, setStatusText] = useState<string>('Click on the button');

    const abiCoder = ethers.AbiCoder.defaultAbiCoder();

    function getEthSignedMessageHash(msgSender: string): string {
        const messageHash = ethers.keccak256(
            abiCoder.encode(['address'], [msgSender])
        );

        // Create the Ethereum signed message hash
        const prefix = "\x19Ethereum Signed Message:\n32";
        return ethers.keccak256(
            ethers.concat([ethers.toUtf8Bytes(prefix), ethers.getBytes(messageHash)])
        );
    }

    async function scanNFC() {
        if (!isConnected || !address) {
            setStatusText('Please connect your wallet');
            return;
        }

        const command: Command = {
            name: "sign",
            keyNo: 1,
            message: getEthSignedMessageHash(address)
        };

        console.log('command:', command);

        let res: unknown;

        try {
            // --- request NFC command execution ---
            const options = null; // no options

            res = await execHaloCmdWeb(command, options);
            // the command has succeeded, display the result to the user
            setStatusText(JSON.stringify(res, null, 4));
        } catch (e: any) {
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
