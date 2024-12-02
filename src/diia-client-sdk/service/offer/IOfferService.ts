import {
    Offer,
    OfferList,
    OfferScopes
} from "../../types";

export default interface IOfferService {
    createOffer(branchId: string, offer: Offer<OfferScopes>): Promise<string>;
    getOffers(branchId: string, skip: number, limit: number): Promise<OfferList>
    deleteOffer(branchId:string, offerId: string): Promise<void>;
}