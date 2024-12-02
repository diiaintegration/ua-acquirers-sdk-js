export default interface ISessionTokenService {
    getSessionToken(): Promise<string>;
}
