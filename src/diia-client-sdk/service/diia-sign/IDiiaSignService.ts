import { B64Document, IDeeplinkConfig } from "../../types";

export default interface IDiiaSignService {
    getSignHashDeepLink(
        baseDeepLinkConfig: IDeeplinkConfig<void>,
        b64Documents: B64Document[]
    ): Promise<string>;

    getAuthDeepLink(
        baseDeepLinkConfig: IDeeplinkConfig<void>
    ): Promise<string>;
}