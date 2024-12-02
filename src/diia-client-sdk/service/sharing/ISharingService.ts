import { IDeeplinkConfig } from "../../types";

export default interface ISharingService {
    getDeepLink(deepLinkConfig: IDeeplinkConfig<void>): Promise<string>;
    requestDocumentByBarCode(branchId: string, barCode: string, requestId: string): Promise<boolean>;
}
