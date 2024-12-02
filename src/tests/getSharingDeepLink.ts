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

        const branchId = "branchId";
        const offerId = "offerId";
        const requestId = "301769a5-c540-4472-93a5-219a084158c2"; 
        const deepLink = await diiaClient.getDeepLink(branchId, offerId, requestId);
        console.log("Deep link:", deepLink);
    } catch (error) {
        console.error("Error retrieving deeplink:", error);
    }
})();
