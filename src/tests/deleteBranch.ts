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

        const branchId = "branch_id";
        await diiaClient.deleteBranch(branchId);
        console.log("Бранч видалено успішно");
    } catch (error) {
        console.error("Помилка при видаленні бранчу:", error);
    }
})();
