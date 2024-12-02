export default interface IValidationService {
    validateDocumentByBarcode(branchId: string, barcode: String): Promise<boolean>;
}
