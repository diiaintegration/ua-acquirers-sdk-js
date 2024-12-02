import ISharingApi from "./ISharingApi";
import HttpMethodExecutor from "../HttpMethodExecutor";
import {log, prettyJson} from "../../utils";
import {IResponseStatus} from "../../types";

export default class SharingApi implements ISharingApi {
    private _http: HttpMethodExecutor;

    constructor(httpMethodExecutor: HttpMethodExecutor) {
        this._http = httpMethodExecutor;
    }

    /*
        curl -X POST "https://{diia_host}/api/v1/acquirers/document-request"
        -H  "accept: application/json"
        -H  "Authorization: Bearer {session_token}"
        -H  "Content-Type: application/json"
        -d "{ \"branchId\": \"{branch_id}\", \"barcode\": \"{barcode}\", \"requestId\": \"{request_id}\" }" or
        -d "{ \"branchId\": \"{branch_id}\", \"qrcode\": \"{qrcode}\", \"requestId\": \"{request_id}\" }"
    */
    async requestDocumentByBarCode(branchId: string, barcode: string, requestId: string): Promise<boolean> {
        log(`Starting requestDocumentByBarCode: barcode=${barcode} branchId=${branchId} requestId=${requestId}`);
        const { data } = await this._http.doPost(
            'api/v1/acquirers/document-request',
            {
                branchId,
                barcode,
                requestId
            }
        );
        log(`Finishing requestDocumentByBarCode: ${prettyJson(data)}`);

        return (data as IResponseStatus).success;
    }
}