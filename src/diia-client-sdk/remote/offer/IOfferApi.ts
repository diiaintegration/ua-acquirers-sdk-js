import { Offer, OfferList, OfferScopes } from "../../types";


export default interface IOfferApi {
    createOffer(branchId: string, offer: Offer<OfferScopes>): Promise<{ _id: string }>;
    getOffers(branchId: string, skip: number, limit: number): Promise<OfferList>;
    deleteOffer(branchId:string, offerId: string): Promise<void>;
}