export default interface IValidationApi {
    validateDocumentByBarcode(branchId: string, barcode: string): Promise<boolean>;
}