const { ethers } = require('ethers');

// Create a random wallet
const wallet = ethers.Wallet.createRandom();

// Access the private key
const privateKey = wallet.privateKey;

// Access the wallet's address
const address = wallet.address;

console.log(`Address: ${address}`);
console.log(`Private Key: ${privateKey}`);
