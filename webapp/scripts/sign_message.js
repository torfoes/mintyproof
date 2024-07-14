require('dotenv').config({ path: '.env.local' });
const { ethers } = require('ethers');

// Load private key from environment variables
const privateKey = process.env.MP_PRIVATE_KEY;

// Ensure the private key is provided
if (!privateKey) {
    throw new Error("Private key not found in environment variables.");
}

// Create a wallet instance using the private key
const wallet = new ethers.Wallet(privateKey);

// Create an instance of the ABI coder
const abiCoder = ethers.AbiCoder.defaultAbiCoder();

// Function to get the Ethereum signed message hash
function getEthSignedMessageHash(msgSender) {
    const messageHash = ethers.keccak256(
        abiCoder.encode(['address'], [msgSender])
    );

    const prefix = "\x19Ethereum Signed Message:\n32";
    return ethers.keccak256(
        ethers.concat([ethers.toUtf8Bytes(prefix), ethers.getBytes(messageHash)])
    );
}

// Function to sign a message
async function signMessage(msgSender) {
    // Get the Ethereum signed message hash
    const ethSignedMessageHash = getEthSignedMessageHash(msgSender);

    console.log("ethSignedMessageHash", ethSignedMessageHash)
    console.log("ethSignedMessageHash", ethers.getBytes(ethSignedMessageHash))

    // Sign the message hash
    const signature = await wallet.signMessage(ethers.getBytes(ethSignedMessageHash));
    return signature;
}

// Example usage
(async () => {
    const msgSender = "0x583031D1113aD414F02576BD6afaBfb302140225";
    try {
        const signature = await signMessage(msgSender);
        console.log(`Message sender: ${msgSender}`);
        console.log(`Signature: ${signature}`);
    } catch (error) {
        console.error("Error signing message:", error);
    }
})();
