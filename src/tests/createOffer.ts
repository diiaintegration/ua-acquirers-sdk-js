import { sdk } from "../index";
import { AxiosRequestConfig } from "axios";
import { Offer, OfferScopes } from "../diia-client-sdk/types";

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


        const newOffer: Offer<OfferScopes> = {
            name: "Test Offer",
            returnLink: "http://google.com/",
            scopes: { sharing: ["passport"] }
        };

        const offerId = await diiaClient.createOffer("your branch_id", newOffer);
        console.log("Created OfferId:", offerId);
    } catch (error) {
        console.error("Error creating offer:", error);
    }
})();
