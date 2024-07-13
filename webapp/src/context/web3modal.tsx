'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import {ReactNode} from "react";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) {
    throw new Error('Missing WalletConnect project ID')
}

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
    name: 'Minty Proof',
    description: 'Mint your proofs with security you trust.',
    url: 'https://mintyproof.com',
    icons: ['']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: false,
    enableOnramp: true // Optional - false as default
})

type Web3ModalProps = {
    children: ReactNode;
};

export function Web3Modal({ children }: Web3ModalProps) {
    return <>{children}</>;
}