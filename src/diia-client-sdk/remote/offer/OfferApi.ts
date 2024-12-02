import HttpMethodExecutor from "../HttpMethodExecutor";
import IOfferApi from "./IOfferApi";
import { AxiosResponse } from "axios";
import {
    Offer,
    OfferList,
    OfferScopes,
    Identification
} from "../../types";
import {genUrlParams, log, prettyJson} from "../../utils";

export default class OfferApi implements IOfferApi {
    private _http: HttpMethodExecutor;

    constructor(httpMethodExecutor: HttpMethodExecutor) {
        this._http = httpMethodExecutor;
    }
    /*
        curl -X POST "https://{diia_host}/api/v1/acquirers/branch/{branch_id}/offer"
        -H  "accept: application/json"
        -H  "Authorization: Bearer {session_token}"
        -H  "Content-Type: application/json"
        -d "{ \"name\": \"Назва послуги\", \"scopes\": { \"sharing\": [\"passport\"] } }"
     */
    async createOffer(branchId: string, offer: Offer<OfferScopes>): Promise<Identification> {
        log(`Starting createOffer: branchId=${branchId} offer=${prettyJson(offer)}`);
        const { data } = await this._http.doPost<Offer<OfferScopes>>(
            `api/v1/acquirers/branch/${branchId}/offer`,
            offer
        );
        log(`Finishing createOffer: ${prettyJson(data)}`);
        return data;
    }

    /*
        curl -X DELETE "https://{diia_host}/api/v1/acquirers/branch/{branch_id}/offer/{offer_id}"
        -H "accept: *//*"
        -H "Authorization: Bearer {session_token}"
        -H "Content-Type: application/json"
    */
    async deleteOffer(branchId: string, offerId: string): Promise<void> {
        log(`Starting deleteOffer: branchId=${branchId} offerId=${offerId}`);
        const response = await this._http.doDelete<AxiosResponse>(
            `api/v1/acquirers/branch/${branchId}/offer/${offerId}`
        );
        log(`Finishing deleteOffer with status ${response.status}`);
    }

    /*
        curl -X GET "https://{diia_host}/api/v1/acquirers/branch/{branch_id}/offers?skip=0&limit=100"
        -H  "accept: application/json"
        -H  "Authorization: Bearer {session_token}"
    */
    async getOffers(branchId: string, skip: number, limit: number): Promise<OfferList> {
        log(`Starting getOffers: branchId=${branchId} skip=${skip} limit=${limit}`);
        const url = `/api/v1/acquirers/branch/${branchId}/offers${genUrlParams(skip, limit)}`;
        const { data } = await this._http.doGet<AxiosResponse>(url);
        log(`Finishing getOffers: ${prettyJson(data)}`);

        return data;
    }
}