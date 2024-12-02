import IValidationApi from "../../remote/validation/IValidationApi";
import IValidationService from "./IValidationService";

export default class ValidationService implements IValidationService {
  private validationApi: IValidationApi;

  constructor(validationApi: IValidationApi) {
    this.validationApi = validationApi;
  }

  async validateDocumentByBarcode(branchId: string, barCode: string): Promise<boolean> {
    return await this.validationApi.validateDocumentByBarcode(branchId, barCode);
  }
}
