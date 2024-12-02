import Branch from '../src/diia-client-sdk/model/remote/Branch';
import BranchList from '../src/diia-client-sdk/model/remote/BranchList';
import OfferList from '../src/diia-client-sdk/model/remote/OfferList';
import DocumentPackage from '../src/diia-client-sdk/model/DocumentPackage';
import EncodedFile from '../src/diia-client-sdk/model/EncodedFile';
import { AxiosRequestConfig } from "axios";
import { Base64, Headers, CryptoLibraryConfiguration } from "../src/diia-client-common/types";
import { Offer, OfferScopes, Identification, IDeeplinkConfig, B64Document } from "../src/diia-client-sdk/types";

export declare class Diia {
    constructor(
        acquirerToken: string,
        diiaHost: string,
        httpRequestConfig: AxiosRequestConfig,
        cryptoLibraryConfig: CryptoLibraryConfiguration
    )

    async getBranches(skip?: number, limit?: number): Promise<BranchList>;
    async getBranch(branchId: string): Promise<Branch>;
    async deleteBranch(branchId: string): Promise<void>;
    async createBranch(branch: Branch): Promise<Identification>
    async updateBranch(branch: Branch): Promise<Identification>

    async getOffers(branchId: string, skip: number, limit: number): Promise<OfferList>;
    async createOffer(branchId: string, offer: Offer<OfferScopes>): Promise<string>;
    async deleteOffer(branchId: string, offerId: string): Promise<void>;
    async requestDocumentByBarCode(branchId: string, barCode: string, requestId: string): Promise<boolean>
    async getDeepLink(branchId: string, offerId: string, requestId: string): Promise<string>
    async validateDocumentByBarcode(branchId: string, barcode: string): Promise<boolean>
    async getSignHashDeepLink(baseDeepLinkConfig: IDeeplinkConfig<void>, b64Documents: B64Document[]): Promise<string>
    async getAuthDeepLink(baseDeepLinkConfig: IDeeplinkConfig<void>): Promise<string>

    decodeDocumentPackage(headers: Headers, multipartBody: EncodedFile[], cryptoMeta: Base64): DocumentPackage
}

export declare const sdk = (
    acquirerToken: string,
    diiaHost: string,
    httpRequestConfig: AxiosRequestConfig,
    cryptoLibraryConfig
) => Diia;
