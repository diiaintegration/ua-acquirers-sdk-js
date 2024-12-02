import axios, { AxiosRequestConfig } from "axios";
import HttpMethodExecutor from "./remote/HttpMethodExecutor";
import AxiosConfiguration from "./remote/AxiosConfiguration";
import {
    B64Document,
    Branch,
    BranchList,
    BranchScopes,
    Headers, IDeeplinkConfig,
    Identification,
    Offer,
    OfferList,
    OfferScopes
} from "./types";
import EncodedFile from "./model/EncodedFile";
import DocumentPackage from "./model/DocumentPackage";
import IDocumentService from "./service/document/IDocumentService";
import IOfferService from "./service/offer/IOfferService";
import ISharingService from "./service/sharing/ISharingService";
import IBranchService from "./service/branch/IBranchService";
import IValidationService from "./service/validation/IValidationService";
import DocumentService from "./service/document/DocumentService";
import SharingService from "./service/sharing/SharingService";
import BranchService from "./service/branch/BranchService";
import OfferService from "./service/offer/OfferService";
import ValidationService from "./service/validation/ValidationService";
import SessionTokenService from "./service/session-token/SessionTokenService";
import BranchApi from "./remote/branch/BranchApi";
import OfferApi from "./remote/offer/OfferApi";
import SharingApi from "./remote/sharing/SharingApi";
import ValidationApi from "./remote/validation/ValidationApi";
import CryptoService from "../diia-client-crypto/CryptoService";
import CryptoUaPkiService from "../diia-client-crypto/CryptoIiTService";
import { Base64, CryptoLibraryConfiguration } from "../diia-client-common/types";
import DiiaSignService from './service/diia-sign/DiiaSignService';
import IDiiaSignService from "./service/diia-sign/IDiiaSignService";
import DeeplinkService from "./service/deeplink/DeeplinkService";
import DeeplinkApi from "./remote/deeplink/DeeplinkApi";

export default class Diia {
    private documentService: IDocumentService;
    private sharingService: ISharingService;
    private branchService: IBranchService;
    private offerService: IOfferService;
    private validationService: IValidationService;
    private diiaSignService: IDiiaSignService;

    /**
     * Constructor
     *
     * @param acquirerToken A token used to identify the Partner
     * @param baseDiiaUrl   base URL to Diia REST API
     * @param httpRequestConfig axios configuration
     * @param cryptoLibraryConfig preconfigured implementation of CryptoService interface
     */
    constructor(
        acquirerToken: string,
        baseDiiaUrl: string,
        httpRequestConfig: AxiosRequestConfig = {},
        cryptoLibraryConfig: CryptoLibraryConfiguration
    ) {
        const axiosInstance = axios.create({
            ...httpRequestConfig,
            baseURL: baseDiiaUrl
        });

        AxiosConfiguration.bindDiiaException(axiosInstance);

        const sessionTokenService = new SessionTokenService(
            acquirerToken,
            baseDiiaUrl,
            axiosInstance
        );
        const httpMethodExecutor = new HttpMethodExecutor(sessionTokenService, axiosInstance);
        const cryptoService = new CryptoService(new CryptoUaPkiService(cryptoLibraryConfig))
        const deepLinkService =  new DeeplinkService(new DeeplinkApi(httpMethodExecutor));

        this.branchService = new BranchService(new BranchApi(httpMethodExecutor));
        this.offerService = new OfferService(new OfferApi(httpMethodExecutor));
        this.sharingService = new SharingService(
            new SharingApi(httpMethodExecutor),
            deepLinkService
        );
        this.validationService = new ValidationService(new ValidationApi(httpMethodExecutor));
        this.diiaSignService = new DiiaSignService(
            deepLinkService,
            cryptoService
        );
        this.documentService = new DocumentService(cryptoService);
    }
    /**
     * Get branches list
     *
     * @param skip  (optional) number of branches to be skipped
     * @param limit (optional) max number of branches in response
     * @return list of branches
     */
    async getBranches(skip?: number, limit?: number): Promise<BranchList> {
        try {
            return await this.branchService.getBranches(skip, limit);
        }  catch (e) {
            console.error('Get branches request error');
            throw e as Error;
        }
    }

    /**
     * Get branch by id
     *
     * @param branchId branch id
     * @return branch
     */
    async getBranch(branchId: string): Promise<Branch<BranchScopes>> {
        try {
            return await this.branchService.getBranch(branchId);
        }  catch (e) {
            console.error('Get branch request error');
            throw e as Error;
        }
    }

    /**
     * Delete branch
     *
     * @param branchId branch id
     */
    async deleteBranch(branchId: string): Promise<void> {
        try {
            return await this.branchService.deleteBranch(branchId);
        }  catch (e) {
            console.error('Delete branch request error');
            throw e as Error;
        }
    }

    /**
     * Create new branch
     *
     * @param branch new branch model
     * @return branch id
     */
    async createBranch(branch: Branch<BranchScopes>): Promise<Identification> {
        try {
            return await this.branchService.createBranch(branch);
        }  catch (e) {
            console.error('Create branch request error');
            throw e as Error;
        }
    }

    /**
     * Update existing branch
     *
     * @param branch updated branch instance
     * @return updated branch id
     */
    async updateBranch(branch: Branch<BranchScopes>): Promise<Identification> {
        try {
            return await this.branchService.updateBranch(branch);
        }  catch (e) {
            console.error('Update branch request error');
            throw e as Error;
        }
    }

    /**
     * Get offers list on the branch
     * There may be a lots of offers on one branch. So it's recommended to limiting requested offers count.
     *
     * @param branchId branch id
     * @param skip     (optional) number of offers to be skipped
     * @param limit    (optional) max number of offers in response
     * @return list of offers
     */
    async getOffers(branchId: string, skip?: number, limit?: number): Promise<OfferList> {
        try {
            return await this.offerService.getOffers(branchId, skip, limit);
        } catch (e) {
            console.error('Offer request error');
            throw e as Error;
        }
    }

    /**
     * Create new offer on the branch
     * @param branchId branch id
     * @param offer new offer model
     * @return offer id
     */
    async createOffer(branchId: string, offer: Offer<OfferScopes>): Promise<string> {
        try {
            return await this.offerService.createOffer(branchId, offer);
        } catch (e) {
            console.error('Offer creation error');
            throw e as Error;
        }
    }

    /**
     * Delete offer
     *
     * @param branchId branch id where the offer was created
     * @param offerId  offer id
     */
    async deleteOffer(branchId: string, offerId: string): Promise<void> {
        try {
            await this.offerService.deleteOffer(branchId, offerId);
        }  catch (e) {
            console.error('Offer deletion error');
            throw e as Error;
        }
    }

    /**
     * Initiate document sharing procedure using document barcode
     *
     * @param branchId  branch id
     * @param barCode   barcode
     * @param requestId unique request id to identify document sharing action;
     *                  it will be sent in http-header with document pack
     * @return sign of successful request
     */
    async requestDocumentByBarCode(branchId: string, barCode: string, requestId: string): Promise<boolean>  {
        try {
            return await this.sharingService.requestDocumentByBarCode(branchId, barCode, requestId);
        }  catch (e) {
            console.error('Document request error');
            throw e as Error;
        }
    }

    /**
     * Get deep link to start document sharing procedure using online scheme
     *
     * @param branchId  branch id
     * @param offerId   offer id
     * @param requestId unique request id to identify document sharing action;
     *                  it will be sent in http-header with document pack
     * @return URL, the deep link that should be opened on mobile device where Diia application is installed
     */
    async getDeepLink(branchId: string, offerId: string, requestId: string): Promise<string> {
        try {
            return await this.sharingService.getDeepLink({
                branchId,
                offerId,
                requestId
            });
        }  catch (e) {
            console.error('DeepLink request error');
            throw e as Error;
        }
    }

    /**
     * Validate document by barcode (on the back-side of document)
     *
     * @param branchId branch id
     * @param barcode  barcode
     * @return sign of document validity
     */
    async validateDocumentByBarcode(branchId: string, barcode: string): Promise<boolean> {
        try {
            return await this.validationService.validateDocumentByBarcode(branchId, barcode);
        }  catch (e) {
            console.error('Validation request error');
            throw e as Error;
        }
    }

    /**
     * Unpacking the documents pack received from Diia, check signatures and decipher documents
     *
     * @param headers       all http-headers from the request from Diia application
     * @param multipartBody list of EncodedFile based on multipart-body from Diia application request
     * @param cryptoMeta encodeData (encoded json metadata)
     */
    decodeDocumentPackage(
        headers: Headers,
        multipartBody: EncodedFile[],
        cryptoMeta: Base64
    ): DocumentPackage {
        try {
            return this.documentService.processDocumentPackage(
                headers,
                multipartBody,
                cryptoMeta
            );
        } catch (e) {
            console.error('decodeDocumentPackage error');
            throw e as Error;
        }
    }

    async getSignHashDeepLink(
        baseDeepLinkConfig: IDeeplinkConfig<void>,
        b64Documents: B64Document[]
    ): Promise<string> {
        try {
            return await this.diiaSignService.getSignHashDeepLink(
                baseDeepLinkConfig,
                b64Documents
            );
        } catch (e) {
            console.error('getSignHashDeepLink error');
            throw e as Error;
        }
    }

    async getAuthDeepLink(
        baseDeepLinkConfig: IDeeplinkConfig<void>
    ): Promise<string>  {
        try {
            return await this.diiaSignService.getAuthDeepLink(
                baseDeepLinkConfig
            );
        } catch (e) {
            console.error('getSignHashDeepLink error');
            console.log(e, 'e');
            throw e as Error;
        }
    }
}