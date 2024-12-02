import { Base64 } from "../../diia-client-common/types";

export default class DecodedFile {
    private fileName: string;
    private data: Base64;

    constructor(fileName: string, data: string) {
        this.fileName = fileName;
        this.data = data;
    }
}