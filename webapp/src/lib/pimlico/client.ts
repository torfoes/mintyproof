import { ENTRYPOINT_ADDRESS_V07, bundlerActions } from "permissionless";
import {
    pimlicoBundlerActions,
    pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import { createClient, createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
    transport: http("https://rpc.ankr.com/polygon_mumbai"),
});

const PIMLICO_APIKEY = process.env.PIMLICO_APIKEY;

export const pimlicoUrl = `https://api.pimlico.io/2/mumbai/rpc?apikey=${PIMLICO_APIKEY}`;

export const pimlicoClient = createClient({
    transport: http(pimlicoUrl),
})
    .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
    .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07))
    .extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07));