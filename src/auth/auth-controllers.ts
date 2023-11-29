import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth-service';
import { reqQuery } from 'src/types/authorizationRequest';
import axios from 'axios';

//НА данный эндпоинт прилетает гет запрос при подключении интеграции на сайте. Он указан как redirect_url.
@Controller('auth')
export class AuthController {
    constructor(
        private crmService: AuthService
    ) {}

    //Метод, который принимает запрос от amoCrm, достаёт из параметров код авторизации и сразу отправляет пост запрос с ним, чтобы получить пару токенов. После получения их, сохраняет их, уже через сервис, чтобы сделать контролер относительно тонким, не давать ему изменять данные. 
    @Get('')
    async test( @Query() params: reqQuery ) {
            const authCode = params.code
            try {
                const { data } = await axios.post('https://godintzoff2015.amocrm.ru/oauth2/access_token',
                    {
                        client_id: process.env.INTEGRATION_ID,
                        client_secret: process.env.CRM_SECRET_KEY,
                        grant_type: 'authorization_code',
                        code: authCode,
                        redirect_uri: process.env.REDIRECT_URL
                    })

                await this.crmService.saveTokens({
                    refreshToken: data.refresh_token,
                    accessToken: data.access_token
                })

            } catch (e) {
                console.log(e)
            }
    }
}
