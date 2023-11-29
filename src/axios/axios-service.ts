import { Injectable } from '@nestjs/common';
import axios from "axios";
import { AuthService } from "src/auth/auth-service";


//В классе ниже я использую axios и его интерцепторы, так как решил не разбираться с HTTP модулем в nest
//Добавил интерцептор на ошибку 401, для запроса нового access токена с api, и один интерцептор на переиспользуемую логику с заголовком авторизации и токеном. Далее все запросы к api, где требуется авторизации осуществляются, через этот сервис.

@Injectable()
export class AxiosService {
    constructor(
        private authService: AuthService
        ) {}

    $api() {
        const $api = axios.create({
            baseURL: process.env.BASE_URL
        })
        $api.interceptors.request.use(async (config) => {
            config.headers.Authorization = `Bearer ${(await this.authService.getTokens()).accesToken}`
            return config
        })

        $api.interceptors.response.use((config) => {
            return config
        }, async error => {
            console.log(error)
            try {
                const originalRequest = error.config
                if(error.response?.status === 401) {
                    await this.authService.getTokensFromApi()
                    return $api.request(originalRequest)
                }
            } catch (e) {
                console.log(e)
            }
        })
        return $api
    }
}
