import { Base64 } from "../diia-client-common/types";

export interface ICryptoLibraryService {
    decrypt(encryptedData: Buffer|Base64): Base64;
    getHashOfItem(payload: Base64): Base64;
}

export default class CryptoService {
    private cryptoLibraryService: ICryptoLibraryService;

    constructor(cryptoLibraryService: ICryptoLibraryService) {
        this.cryptoLibraryService = cryptoLibraryService;
    }

    decrypt(buffPayload: Buffer|Base64): Base64 {
        return this.cryptoLibraryService.decrypt(buffPayload) as Base64;
    }

    getHashOfItem(payload: Base64): Base64 {
        return this.cryptoLibraryService.getHashOfItem(payload)
    }

}