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
        const barcode = "3004970569106";
        const requestId = "22adc578-907c-499b-95f3-ec1e3eab4efd";
        const document = await diiaClient.requestDocumentByBarCode(branchId, barcode, requestId);
        console.log("Document received:", document);
    } catch (error) {
        console.error("Error requesting document:", error);
    }
})();
