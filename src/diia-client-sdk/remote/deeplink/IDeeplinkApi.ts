import { IDeeplinkConfig } from "../../types";

export default interface IDeeplinkApi {
    getDeepLink(deepLinkConfig: IDeeplinkConfig<any>): Promise<{ deeplink: string }>;
}