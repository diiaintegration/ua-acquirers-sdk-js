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
        const barcode = "1234567890";
        const validationResult = await diiaClient.validateDocumentByBarcode(branchId, barcode);
        console.log("Validation result:", validationResult);
    } catch (error) {
        console.error("Error validating document:", error);
    }
})();
