import { Safe4337Pack } from '@safe-global/relay-kit';
import { ethers } from 'ethers';

export async function initializeSafe4337Pack(signerPrivateKey: string) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(signerPrivateKey, provider);

    return await Safe4337Pack.init({
        provider: process.env.NEXT_PUBLIC_RPC_URL!,
        signer,
        bundlerUrl: `https://api.pimlico.io/v1/sepolia/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`,
        paymasterOptions: {
            isSponsored: true,
            paymasterUrl: `https://api.pimlico.io/v2/sepolia/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`,
            // Add paymaster address and token address if needed
        }
    });
}

export async function createAndExecuteTransaction(
    safe4337Pack: Safe4337Pack,
    nfcTagAddress: string,
    nfcTagData: string,
    userAddress: string,
    userData: string
) {
    const nfcTagTransaction = { to: nfcTagAddress, data: nfcTagData, value: 0 };
    const userTransaction = { to: userAddress, data: userData, value: 0 };

    const transactions = [nfcTagTransaction, userTransaction];

    const safeOperation = await safe4337Pack.createTransaction({ transactions });
    const signedSafeOperation = await safe4337Pack.signSafeOperation(safeOperation);

    return await safe4337Pack.executeTransaction({
        executable: signedSafeOperation
    });
}

export async function checkTransactionStatus(safe4337Pack: Safe4337Pack, userOperationHash: string) {
    let userOperationReceipt = null;

    while (!userOperationReceipt) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        userOperationReceipt = await safe4337Pack.getUserOperationReceipt(userOperationHash);
    }

    return await safe4337Pack.getUserOperationByHash(userOperationHash);
}