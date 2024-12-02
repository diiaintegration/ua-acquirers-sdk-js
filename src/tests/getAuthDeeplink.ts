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

        const documentId = "some-document-id";
        const authDeepLink = await diiaClient.getAuthDeepLink(documentId);
        console.log("Deep link for authentication:", authDeepLink);
    } catch (error) {
        console.error("Error retrieving deep link for authentication:", error);
    }
})();
