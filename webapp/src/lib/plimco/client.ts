import { ENTRYPOINT_ADDRESS_V07, bundlerActions } from "permissionless";
import {
    pimlicoBundlerActions,
    pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import { createClient, createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
    transport: http("https://rpc.ankr.com/polygon_mumbai"),
});

export const pimlicoUrl = "https://api.pimlico.io/2/mumbai/rpc?apikey=3c06f4c3-ffaf-4bd0-87d7-38d6ce058337";

export const pimlicoClient = createClient({
    transport: http(pimlicoUrl),
})
    .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
    .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07))
    .extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07));