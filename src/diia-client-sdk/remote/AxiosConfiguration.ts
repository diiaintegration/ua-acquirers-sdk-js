import { AxiosInstance } from "axios";

export default class AxiosConfiguration {
    static bindDiiaException(http: AxiosInstance) {
        http.interceptors.response.use(response => response, (error) => {
            const { response } = error;

            if (response) {
                throw error.response.data;
            }

            throw error;
        });

        return this;
    }
}