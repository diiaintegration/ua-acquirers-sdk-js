import { IDeeplinkConfig } from "../../types";

export default interface IDeeplinkService {
    getDeepLink<D = void>(
        deeplinkConfig: IDeeplinkConfig<D>
    ): Promise<string>
}