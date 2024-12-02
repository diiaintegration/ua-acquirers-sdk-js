import ISessionTokenService from "../service/session-token/ISessionTokenService";
import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export default class HttpMethodExecutor {

    private sessionTokenService: ISessionTokenService;
    private http: AxiosInstance;

    constructor(sessionTokenService: ISessionTokenService, http: AxiosInstance) {
        this.sessionTokenService = sessionTokenService;
        this.http = http;
    }

    async doGet<R>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${await this.sessionTokenService.getSessionToken()}`
        };
        return await this.http.get(url, config);
    }

    async doPost<P extends {}>(url: string, payload: P, config: any = {}) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${await this.sessionTokenService.getSessionToken()}`
        };

        return await this.http.post(url, payload, config);
    }

    async doDelete<R>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${await this.sessionTokenService.getSessionToken()}`
        };
        return await this.http.delete(url, config);
    }

    async doPut<P extends {}, R>(url: string, payload: P, config: any = {}) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${await this.sessionTokenService.getSessionToken()}`
        };
        return await this.http.put(url, payload, config);
    }
}