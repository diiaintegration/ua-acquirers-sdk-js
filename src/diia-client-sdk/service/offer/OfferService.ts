import IOfferService from "./IOfferService";
import IOfferApi from "../../remote/offer/IOfferApi";
import {
    Offer,
    OfferList,
    OfferScopes
} from "../../types";

export default class OfferService implements IOfferService {
    private offerApi: IOfferApi;

    constructor(offerApi: IOfferApi) {
        this.offerApi = offerApi;
    }

    async createOffer(branchId: string, offer: Offer<OfferScopes>): Promise<string> {
        const response = await this.offerApi.createOffer(
            branchId,
            offer
        );

        return response._id;
    }

    async getOffers(branchId: string, skip: number, limit: number): Promise<OfferList> {
        return await this.offerApi.getOffers(branchId, skip, limit);
    }

    async deleteOffer(branchId:string, offerId: string): Promise<void> {
        await this.offerApi.deleteOffer(branchId, offerId);
    }
}
