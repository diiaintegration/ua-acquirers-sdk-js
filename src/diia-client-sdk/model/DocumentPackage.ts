import Metadata from "./Metadata";
import DecodedFile from "./DecodedFile";

export default class DocumentPackage {
    private requestId: string;
    private decodedFiles: DecodedFile[];
    private data: Metadata;

    constructor(requestId: string, decodedFiles: DecodedFile[], data: Metadata) {
        this.requestId = requestId;
        this.decodedFiles = decodedFiles;
        this.data = data;
    }
}