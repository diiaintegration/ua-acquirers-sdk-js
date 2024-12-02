import HttpMethodExecutor from "../HttpMethodExecutor";
import IValidationApi from "./IValidationApi";
import { Identification, IResponseStatus } from "../../types";
import {log, prettyJson} from "../../utils";

export default class ValidationApi implements IValidationApi {
    private _http: HttpMethodExecutor;

    constructor(httpMethodExecutor: HttpMethodExecutor) {
        this._http = httpMethodExecutor;
    }

    /*
        curl -X POST "https://{diia_host}/api/v1/acquirers/document-identification"
        -H "accept: application/json"
        -H "Authorization: Bearer {session_token}"
        -H "Content-Type: application/json"
        -d "{\"branchId\":\"{branch_id}\",\"barcode\":\"{barcode}\"}"
    */
    async validateDocumentByBarcode(branchId: string, barcode: string): Promise<boolean> {
        log(`Starting validateDocumentByBarcode: barcode=${barcode} branchId=${branchId}`);
        const { data } = await this._http.doPost(
            '/api/v1/acquirers/document-identification',
            {
                branchId,
                barcode
            }
        );
        log(`Finishing validateDocumentByBarcode: ${prettyJson(data)}`);

        return (data as IResponseStatus).success;
    }
}