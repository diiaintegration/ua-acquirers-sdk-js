import IDeeplinkService from "./IDeeplinkService";
import IDeeplinkApi from "../../remote/deeplink/IDeeplinkApi";
import { IDeeplinkConfig } from "../../types";
import {log} from "../../utils";

export default class DeeplinkService implements IDeeplinkService {
    private deeplinkApi: IDeeplinkApi;

    constructor(deeplinkApi: IDeeplinkApi) {
        this.deeplinkApi = deeplinkApi;
    }

    async getDeepLink<D = void>(
        deeplinkConfig: IDeeplinkConfig<D>
    ): Promise<string> {
        const { deeplink } = await this.deeplinkApi.getDeepLink(
            deeplinkConfig
        );
        log(`deeplink = ${deeplink}`);
        return deeplink;
    }
}