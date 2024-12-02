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

        const BranchId = "BranchId";
        const offerIdToDelete = "OfferId";
        await diiaClient.deleteOffer(BranchId, offerIdToDelete);
        console.log("Offer successfully deleted.");
    } catch (error) {
        console.error("Error deleting offer:", error);
    }
})();
