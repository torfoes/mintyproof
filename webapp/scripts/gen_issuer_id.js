const { ethers } = require('ethers');

// Function to generate issuerId from public key
function generateIssuerId(publicKey) {
    const abiCoder = ethers.AbiCoder.defaultAbiCoder();
    const issuerId = ethers.keccak256(
        abiCoder.encode(['bytes'], [ethers.getBytes(publicKey)])
    );
    return issuerId;
}

// Example usage
const publicKey = "0xdD870fA1b7C4700F2BD7f44238821C26f7392148";

const issuerId = generateIssuerId(publicKey);
console.log("Generated Issuer ID:", issuerId);