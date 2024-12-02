import { Base64 }  from "../../diia-client-common/types";


// --- Branches ---
type DiiaSignType = "hashedFilesSigning" | "auth"

export interface BaseBranchScope {
    sharing: string[];
    identification: string[];
    documentIdentification: string[];
}

export interface SignBranchScope {
    diiaId: DiiaSignType[]
}

export type BranchScopes = BaseBranchScope | SignBranchScope


export interface BranchList {
    total: number;
    branches: Branch<BranchScopes>[];
}

export interface Branch<T> {
    id: string;
    name: string;
    email: string;
    region: string;
    district: string;
    location: string;
    street: string;
    house: string;
    customFullName: string;
    customFullAddress: string;
    deliveryTypes: string[];
    offerRequestType: string;
    scopes: T;
}

/// --- Offer ---
export interface BaseOfferScopes {
    sharing: string[];
}

export interface SignOfferScopes {
    diiaId: DiiaSignType[];
}


export type OfferScopes = BaseOfferScopes | SignOfferScopes;

export interface OfferList {
    total: number;
    offers: Offer<OfferScopes>[];
}

export interface Offer<T> {
    name: string;
    returnLink: string;
    scopes: T;
}


// ---  DeepLink  ----

export interface IDeeplinkConfig<D> {
    offerId: string;
    branchId: string;
    requestId: string;
    returnLink?: string;
    data?: D | void
}

// --- Document ---

export interface B64Document {
    fileName: string;
    fileB64: Base64
}

export interface B64DocumentMeta {
    fileName: string;
    fileHash: Base64
}


// --- DiiaSign ---

export interface ISignData {
    hashedFilesSigning: IHashedFilesSigning
}

export interface IHashedFilesSigning {
    hashedFiles: HashedFilesType
}

export type HashedFilesType = B64DocumentMeta[];

// --- Another ---

export interface IResponseStatus {
    success: boolean;
}

export interface Identification {
    _id: string;
}

export type Headers = {
    [key: string]: string;
};

