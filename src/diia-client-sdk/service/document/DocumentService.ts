import IDocumentService from "./IDocumentService";
import DocumentPackage from "../../model/DocumentPackage";
import EncodedFile from "../../model/EncodedFile";
import CryptoService from "../../../diia-client-crypto/CryptoService";
import DecodedFile from "../../model/DecodedFile";
import { Base64 } from "../../../diia-client-common/types";
import { Headers } from "../../types";
import Metadata from "../../model/Metadata";
import {log} from "../../utils";
import {inspect} from "util";

export default class DocumentService implements IDocumentService {
    private cryptoService: CryptoService;

    constructor(cryptoService: CryptoService) {
        this.cryptoService = cryptoService;
    }

    processDocumentPackage(
        headers: Headers,
        multipartBody: EncodedFile[],
        cryptoMeta: Base64
    ): DocumentPackage {
        log(`Starting DocumentService.processDocumentPackage...`);
        const { requestId } = headers;

        const decodedDocuments: DecodedFile[] = multipartBody.reduce(
            this.preparePackageDocument.bind(this),
            []
        );

        const decodedMeta: Metadata = this.preparePackageMeta(cryptoMeta);

        log(`decodedMeta = ${inspect(decodedMeta)}`);

        return new DocumentPackage(
            requestId,
            decodedDocuments,
            decodedMeta
        );
    }

    private preparePackageDocument(
        accumulationDocPackage: DecodedFile[],
        document: EncodedFile
    ): DecodedFile[] {
        const buffDocument: Buffer = document.data;

        if (!Buffer.isBuffer(buffDocument)) {
            throw new Error('Document isn`t buffer type');
        }

        const decodedDocument: Base64 = this.cryptoService.decrypt(buffDocument);

        return decodedDocument? [
            ...accumulationDocPackage,
            new DecodedFile(
                document.originalFileName,
                decodedDocument
            )
        ] : accumulationDocPackage;
    }

    private preparePackageMeta(cryptoMeta: Base64): Metadata  {
        const b64Meta: Base64 = this.cryptoService.decrypt(cryptoMeta);
        const jsonMeta: string = Buffer.from(b64Meta, 'base64').toString('utf8');
        return  JSON.parse(jsonMeta);
    }
}
