import IDeeplinkApi from "./IDeeplinkApi";
import HttpMethodExecutor from "../HttpMethodExecutor";
import { log, prettyJson } from "../../utils";
import { IDeeplinkConfig } from "../../types";
import { inspect } from "util";

export default class DeeplinkApi implements IDeeplinkApi {
    private _http: HttpMethodExecutor;

    constructor(httpMethodExecutor: HttpMethodExecutor) {
        this._http = httpMethodExecutor;
    }

    /*
        curl -X POST "https://{diia_host}/api/v2/acquirers/branch/{branch_id}/offer-request/dynamic"
        -H  "accept: application/json"
        -H  "Authorization: Bearer {session_token}"
        -H  "Content-Type: application/json"
        -d "{ \"offerId\": \"{offer_id}\", \"requestId\": \"{request_id}\" }"
    */
    async getDeepLink(deepLinkConfig: IDeeplinkConfig<any>):  Promise<{ deeplink: string }> {
        log(`Starting getDeepLink: deepLinkConfig=${inspect(deepLinkConfig)}`);

        const { branchId, offerId, requestId, ...rest } = deepLinkConfig;

        const { data } = await this._http.doPost(
            `api/v2/acquirers/branch/${branchId}/offer-request/dynamic`,
            {
                offerId,
                requestId,
                ...rest
            }
        );

        log(`Finishing getDeepLink: ${prettyJson(data)}`);

        return data;
    }
}