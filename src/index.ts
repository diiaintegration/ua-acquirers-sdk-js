import Diia from "./diia-client-sdk/Diia";
import * as dotenv from "dotenv";
import { AxiosRequestConfig } from "axios";
dotenv.config({ path: '.env' });

export const sdk = (
    acquirerToken: string,
    diiaHost: string,
    httpRequestConfig: AxiosRequestConfig,
    cryptoLibraryConfig
) => {
    return new Diia(
        acquirerToken,
        diiaHost,
        httpRequestConfig,
        cryptoLibraryConfig
    );
};