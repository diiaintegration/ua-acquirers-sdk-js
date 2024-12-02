import { sdk } from "../index";
import { AxiosRequestConfig } from "axios";
import { IDeeplinkConfig, B64Document } from "../diia-client-sdk/types";
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


        const baseDeepLinkConfig: IDeeplinkConfig<void> = {
            branchId: "branchId",
            offerId: "offerId",
            requestId: "3aa24065-6d9b-4b87-9b0f-dd49733cfed7"
        };

        const b64Documents: B64Document[] = [
            {
                fileName: "document1.pdf",
                fileB64: "base64EncodedString1"
            }
        ];

        const signHashDeepLink = await diiaClient.getSignHashDeepLink(baseDeepLinkConfig, b64Documents);
        console.log("Deeplink:", signHashDeepLink);
    } catch (error) {
        console.error("Error retrieving deeplink:", error);
    }
})();
