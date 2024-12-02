import { sdk } from "../index";
import { AxiosRequestConfig } from "axios";
import { Branch, BranchScopes } from "../diia-client-sdk/types";

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

        const newBranch: Branch<BranchScopes> = {
            id: "", 
            name: "Test Branch",
            email: "test@example.com",
            region: "Kyiv",
            district: "Central",
            location: "Test Location",
            street: "123 Test Street",
            house: "1A",
            customFullName: "Test Branch Full Name",
            customFullAddress: "Test Branch Full Address",
            deliveryTypes: ["api"],
            offerRequestType: "dynamic",
            scopes: { sharing: ["passport"], identification: [], documentIdentification: [] }
        };

        const branchId = await diiaClient.createBranch(newBranch);
        console.log("Created BranchId:", branchId);
    } catch (error) {
        console.error("Error creating branch:", error);
    }
})();
