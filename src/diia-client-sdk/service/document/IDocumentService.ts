import EncodedFile from "../../model/EncodedFile";
import DocumentPackage from "../../model/DocumentPackage";
import { Headers } from "../../types";
import { Base64 } from "../../../diia-client-common/types";

export default interface IDocumentService {
  /**
   * Processing documents pack: decrypt, check sign
   * @return
   */
  processDocumentPackage(
      headers: Headers,
      multipartBody: EncodedFile[],
      cryptoMeta: Base64
  ): DocumentPackage;
}
