// import {
//     ENTRYPOINT_ADDRESS_V07,
//     createSmartAccountClient,
// } from "permissionless";
// import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
// import { http } from "viem";
// import { sepolia } from "viem/chains";
// import { pimlicoClient, pimlicoUrl, publicClient } from "./client";
//
// const account = await privateKeyToSimpleSmartAccount(publicClient, {
//     privateKey: "0x69099e79ea48e86ca76f01d0dd086c6d40ba516764bb3027603f785a30afc9ae",
//     factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985", // simple account factory
//     entryPoint: ENTRYPOINT_ADDRESS_V07,
// });
//
// const smartAccountClient = createSmartAccountClient({
//     account,
//     entryPoint: ENTRYPOINT_ADDRESS_V07,
//     chain: sepolia,
//     bundlerTransport: http(pimlicoUrl),
//     middleware: {
//         sponsorUserOperation: pimlicoClient.sponsorUserOperation,
//         gasPrice: async () => {
//             return (await pimlicoClient.getUserOperationGasPrice()).fast;
//         },
//     },
// });
//
// const txHash = await smartAccountClient.sendTransaction({
//     to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
//     value: 0n,
//     data: "0x1234",
// });