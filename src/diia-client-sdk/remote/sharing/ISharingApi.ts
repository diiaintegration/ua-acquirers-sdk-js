export default interface ISharingApi {
    requestDocumentByBarCode(branchId: string, barCode: string, requestId: string): Promise<boolean>;
}
