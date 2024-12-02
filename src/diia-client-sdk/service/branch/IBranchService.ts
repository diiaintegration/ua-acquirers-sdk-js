import {
    Branch,
    BranchList, BranchScopes,
    Identification
} from "../../types";

export default interface IBranchService {
    /**
     *
     * @return
     *
     * curl -X GET "https://api2s.diia.gov.ua/api/v2/acquirers/branches?skip=0&limit=2" -H "accept: application/json" -H "Authorization: Bearer bXi124jbs3cFas...Sjf"
     */
    getBranches(skip: number, limit: number): Promise<BranchList>;
    getBranch(branchId: string): Promise<Branch<BranchScopes>>;
    deleteBranch(branchId: string): Promise<void>;
    createBranch(request: Branch<BranchScopes>): Promise<Identification>;
    updateBranch(request: Branch<BranchScopes>): Promise<Identification>;
}
