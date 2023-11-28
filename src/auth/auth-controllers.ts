import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { AuthService } from './auth-service';
import { reqQuery } from 'src/types/authorizationRequest';
import { AxiosService } from 'src/axios/axios-service';
import axios from 'axios';

@Controller('crm-integration')
export class AuthController {
    constructor(
        private crmService: AuthService,
        // private axiosService: AxiosService
    ) {}

    @Get('')
    async test( @Query() params: reqQuery ) {
            const authCode = params.code
            const { data } = await axios.post('https://godintzoff2015.amocrm.ru/oauth2/access_token',
                {
                    client_id: process.env.INTEGRATION_ID,
                    client_secret: process.env.CRM_SECRET_KEY,
                    grant_type: 'authorization_code',
                    code: authCode,
                    redirect_uri: process.env.REDIRECT_URL
                }
            )

            await this.crmService.saveTokens({
                refreshToken: data.refresh_token,
                accessToken: data.access_token
            })
    }
}
