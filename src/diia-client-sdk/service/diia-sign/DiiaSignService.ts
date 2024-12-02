import IDiiaSignService from './IDiiaSignService';
import IDeeplinkService from "../deeplink/IDeeplinkService";
import CryptoService from "../../../diia-client-crypto/CryptoService";
import {
    B64Document,
    B64DocumentMeta,
    IDeeplinkConfig,
    IHashedFilesSigning, ISignData
} from "../../types";
import {log} from "../../utils";
import {inspect} from "util";

export default class DiiaSignService implements IDiiaSignService {
    private deepLinkService: IDeeplinkService;
    private cryptoService: CryptoService;

    constructor(
        deepLinkService: IDeeplinkService,
        cryptoService: CryptoService
    ) {
        this.deepLinkService = deepLinkService;
        this.cryptoService = cryptoService;
    }

    async getSignHashDeepLink<D>(
        baseDeepLinkConfig: IDeeplinkConfig<void>,
        b64Documents: B64Document[]
    ): Promise<string> {
        log(`Starting DiiaSignService.getSignHashDeepLink: baseDeepLinkConfig=${inspect(baseDeepLinkConfig)}`);
       const hashedFiles: B64DocumentMeta[] = b64Documents.map(({ fileName, fileB64 }: B64Document) => ({
            fileName,
            fileHash: this.cryptoService.getHashOfItem(fileB64)
        }))

        const isAllFilesHaveHash = hashedFiles.every(file => Boolean(file.fileHash));

        if (!isAllFilesHaveHash) {
            throw new Error('Failed to get hash of documents');
        }

        const hashedFilesSigning: IHashedFilesSigning = { hashedFiles }
        const signData: ISignData = { hashedFilesSigning };

        return await this.deepLinkService.getDeepLink<ISignData>({
            ...baseDeepLinkConfig,
            data: signData
        });
    }

    async getAuthDeepLink(
        baseDeepLinkConfig: IDeeplinkConfig<void>,
    ): Promise<string> {
        let { requestId } = baseDeepLinkConfig;
        const hashedRequestId = this.cryptoService.getHashOfItem(requestId);

        console.log(baseDeepLinkConfig, 'baseDeepLinkConfig');
        console.log(hashedRequestId, 'hashedRequestId');

        return await this.deepLinkService.getDeepLink<void>({
            ...baseDeepLinkConfig,
            requestId: hashedRequestId
        });
    }
}