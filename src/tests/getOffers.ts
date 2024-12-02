import { sdk } from "../index";
import { AxiosRequestConfig } from "axios";

import * as dotenv from "dotenv";
dotenv.config();

(async () => {
    try {
        const acquirerToken = process.env.ACQUIRER_TOKEN!;
        const diiaHost = process.env.DIIA_HOST!;
        const httpRequestConfig: AxiosRequestConfig = {
            timeout: 5000,
        };

        const diiaClient = sdk(acquirerToken, diiaHost, httpRequestConfig, {});

        const branchId = "18a7c3a3fac8d367f74ac75375e9009e964b10583d9460a9f15d40a816ddc372a28529ec5bbfd3da24ddb8135b1b69fb809e5ba1e70974d163057d6b6e20f31c";
        const offers = await diiaClient.getOffers(branchId, 0, 10);
        console.log("Branch Offers:", offers);
    } catch (error) {
        console.error("Error during SDK testing:", error);
    }
})();
