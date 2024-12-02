import ISharingService from "./ISharingService";
import ISharingApi from "../../remote/sharing/ISharingApi";
import IDeeplinkService from "../deeplink/IDeeplinkService";
import { IDeeplinkConfig } from "../../types";

export default class SharingService implements ISharingService {
    private sharingApi: ISharingApi;
    private deepLinkService: IDeeplinkService;

    constructor(
        sharingApi: ISharingApi,
        deepLinkService: IDeeplinkService
    ) {
        this.sharingApi = sharingApi;
        this.deepLinkService = deepLinkService;
    }

    async getDeepLink(deepLinkConfig: IDeeplinkConfig<void>): Promise<string> {
        return await this.deepLinkService.getDeepLink(deepLinkConfig);
    }

    async requestDocumentByBarCode(branchId: string, barCode: string, requestId: string): Promise<boolean> {
        return await this.sharingApi.requestDocumentByBarCode(branchId, barCode, requestId);
    }
}
