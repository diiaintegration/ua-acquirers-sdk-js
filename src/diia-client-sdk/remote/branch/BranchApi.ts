import IBranchApi from "./IBranchApi";
import HttpMethodExecutor from "../HttpMethodExecutor";
import {
    Branch,
    BranchList,
    BranchScopes,
    Identification
} from "../../types";
import {
    genUrlParams,
    log,
    prettyJson
} from "../../utils";

export default class BranchApi implements IBranchApi {
    private _http: HttpMethodExecutor;

    constructor(httpMethodExecutor: HttpMethodExecutor) {
        this._http = httpMethodExecutor;
    }

    /*
    curl -X POST "{diia_host}/api/v2/acquirers/branch"
    -H "accept: application/json"
    -H "Authorization: Bearer {session_token}"
    -H "Content-Type: application/json"
    -d "{\"customFullName\":\"Повна назва запитувача документа\", \"customFullAddress\":\"Повна адреса відділення\",
    \"name\":\"Назва відділення\", \"email\":\"test@email.com\", \"region\":\"Київська обл.\",
    \"district\":\"Києво-Святошинський р-н\", \"location\":\"м. Вишневе\", \"street\":\"вул. Київська\",
    \"house\":\"2г\", \"deliveryTypes\": [\"api\"], \"offerRequestType\": \"dynamic\",
    \"scopes\":{\"sharing\":[\"passport\",\"internal passport\",\"foreign-passport\"], \"identification\":[],
    \"documentIdentification\":[\"internal-passport\",\"foreign passport\"]}}"
    */
    async createBranch(newBranch: Branch<BranchScopes>): Promise<Identification> {
        log(`Starting createBranch: ${prettyJson(newBranch)}`);
        const { data } =  await this._http.doPost(
            '/api/v2/acquirers/branch',
            newBranch
        );
        log(`Finishing createBranch: ${prettyJson(data)}`);

        return data;
    }

    /*
        curl -X DELETE "{diia_host}/api/v2/acquirers/branch/{branch_id}"
        -H "Accept: *//*"
        -H "Authorization: Bearer {session_token}"
        -H "Content-Type: application/json"
    */
    async deleteBranchById(branchId: string): Promise<void> {
        log(`Starting deleteBranchById: ${branchId}`);
        const response = await this._http.doDelete(
            `/api/v2/acquirers/branch/${branchId}`
        );
        log(`Finishing deleteBranchById with status ${response.status}`);
    }

    /*
        curl -X GET "{diia_host}/api/v2/acquirers/branches?skip=0&limit=2"
        -H "accept: application/json"
        -H "Authorization: Bearer {session_token}"
    */
    async getAllBranches(skip: number, limit: number): Promise<BranchList> {
        log(`Starting getAllBranches: skip=${skip} limit=${limit}`);
        const url = `/api/v2/acquirers/branches${genUrlParams(skip, limit)}`;
        const { data } =  await this._http.doGet(url);
        log(`Finishing getAllBranches: ${prettyJson(data)}`);

        return data;
    }

    /*
    curl -X GET "{diia_host}/api/v2/acquirers/branch/{branch_id}"
    -H "accept: application/json"
    -H "Authorization: Bearer {session_token}"
    */

    async getBranchById(branchId: string): Promise<Branch<BranchScopes>> {
        log(`Starting getBranchById: branchId=${branchId}`);
        const { data } =  await this._http.doGet(
            `/api/v2/acquirers/branch/${branchId}`
        );
        log(`Finishing getBranchById: ${prettyJson(data)}`);

        return data;
    }

    /*
        curl -X PUT "{diia_host}/api/v2/acquirers/branch/{branch_id}"
        -H "Accept: application/json"
        -H "Authorization: Bearer {session_token}"
        -H "Content-Type: application/json"
        -d "{\"customFullName\":\"Повна назва запитувача документа\", \"customFullAddress\":\"Повна адреса відділення\",
        \"name\":\"Назва відділення\", \"email\":\"test@email.com\", \"region\":\"Київська обл.\",
        \"district\":\"Києво-Святошинський р-н\", \"location\":\"м. Вишневе\", \"street\":\"вул. Київська\",
        \"house\":\"2г\", \"deliveryTypes\": [\"api\"], \"offerRequestType\": \"dynamic\",
        \"scopes\":{\"sharing\":[\"passport\",\"internal passport\",\"foreign-passport\"], \"identification\":[],
        \"documentIdentification\":[\"internal-passport\",\"foreign passport\"]}}"
    */

    async updateBranch(branch: Branch<BranchScopes>): Promise<Identification> {
        log(`Starting updateBranch: ${branch}`);
        const { data } =  await this._http.doPut(
            `/api/v2/acquirers/branch/${branch.id}`,
            branch
        );
        log(`Finishing getBranchById: ${data}`);

        return data;
    }
}