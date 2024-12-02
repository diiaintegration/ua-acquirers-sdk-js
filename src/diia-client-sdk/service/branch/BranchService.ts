import IBranchService from "./IBranchService";
import IBranchApi from "../../remote/branch/IBranchApi";
import {
    Branch, BranchList,
    BranchScopes,
    Identification
} from "../../types";

export default class BranchService implements IBranchService {
    private branchApi: IBranchApi;

    constructor(branchApi: IBranchApi) {
        this.branchApi = branchApi;
    }

    public async getBranches(skip: number, limit: number): Promise<BranchList> {
        return await this.branchApi.getAllBranches(skip, limit);
    }

    public async getBranch(branchId: string): Promise<Branch<BranchScopes>> {
        return await this.branchApi.getBranchById(branchId);
    }

    public async deleteBranch(branchId: string): Promise<void> {
        await this.branchApi.deleteBranchById(branchId);
    }

    public async createBranch(newBranch: Branch<BranchScopes>): Promise<Identification> {
        return await this.branchApi.createBranch(newBranch);
    }

    public async updateBranch(branch: Branch<BranchScopes>): Promise<Identification> {
        return await this.branchApi.updateBranch(branch);
    }
}
