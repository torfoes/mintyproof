const { ethers } = require('ethers');


const message = "010203";

// Function to hash the message
function getMessageHash(message) {
    return ethers.keccak256(ethers.toUtf8Bytes(message));
}

function getEthSignedMessageHash(messageHash) {
    return ethers.keccak256(
        ethers.concat([
            ethers.toUtf8Bytes("\x19Ethereum Signed Message:\n32"),
            messageHash
        ])
    );
}

// Generate the message hash
const messageHash = getMessageHash(message);
console.log('Message Hash:', messageHash);

// Generate the Ethereum signed message hash
const ethSignedMessageHash = getEthSignedMessageHash(messageHash);
console.log('Ethereum Signed Message Hash:', ethSignedMessageHash);

async function signMessage(signature) {
    // const signature = await wallet.signMessage(ethers.utils.arrayify(ethSignedMessageHash));
    console.log('Signature:', signature);

    // Split the signature into r, s, and v
    const sig = ethers.splitSignature(signature);
    console.log('r:', sig.r);
    console.log('s:', sig.s);
    console.log('v:', sig.v);

    return { message, messageHash, ethSignedMessageHash, signature, ...sig };
}

const signature = "501c1d9c463d9c05ca6a08f418bc55f5f234a63cb20e8b9cbb3440e572c38648"
console.log(ethers.verifyMessage(signature))