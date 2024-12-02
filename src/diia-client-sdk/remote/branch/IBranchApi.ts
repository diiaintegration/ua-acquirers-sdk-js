import {
    Branch,
    BranchList,
    BranchScopes,
    Identification
} from "../../types";

export default interface IBranchApi {
    createBranch(request: Branch<BranchScopes>): Promise<Identification>;
    getBranchById(branchId: string): Promise<Branch<BranchScopes>>;
    updateBranch(branch: Branch<BranchScopes>): Promise<Identification>;
    deleteBranchById(branchId: string): Promise<void>;
    getAllBranches(skip: number, limit: number): Promise<BranchList>;
}