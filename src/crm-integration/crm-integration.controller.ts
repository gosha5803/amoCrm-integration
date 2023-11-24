import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { CrmIntegrationService } from './crm-integration.service';
import { reqQueryBody } from 'src/types/authorizationRequest';
import { HttpService } from '@nestjs/axios/dist';
import { tap } from 'node:test/reporters';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('crm-integration')
export class CrmIntegrationController {
    constructor(
        private crmService: CrmIntegrationService,
        private httpService: HttpService
        ) {}

    @Post()
    getAuthCode() {

    }

    @Get('')
    async test(
        // @Req() req: Request,
        @Query() params: reqQueryBody
        ) {
            const authCode = params.code

                const { data } = await firstValueFrom(
                    this.httpService.post('https://godintzoff2015.amocrm.ru/oauth2/access_token',
                {
                    client_id: process.env.INTEGRATION_ID,
                    client_secret: process.env.CRM_SECRET_KEY,
                    grant_type: 'authorization_code',
                    code: authCode,
                    redirect_uri: 'https://2bf9-82-209-106-45.ngrok-free.app/crm-integration'
                }).pipe(
                    catchError((error: AxiosError) => {
                        console.log(error)
                        throw error
                    })
                )
                )

                this.crmService.saveTokens({
                    refreshToken: data.refresh_token,
                    accessToken: data.access_token
                })
                

    }

    // @Get('/get-amo-tokens')
    // getAmoTokens() {
    //     const res = this.httpService.post('https://godintzoff2015.amocrm.ru/oauth2/access_token',
    //         {
    //             client_id: process.env.INTEGRATION_ID,
    //             client_secret: process.env.CRM_SECRET_KEY,
    //             grant_type: 'authorization_code',
    //             code: authCode,
    //             redirect_uri: 'https://d329-82-209-106-45.ngrok-free.app/crm-integration'
    //         })
    //         res.subscribe(x => {
    //             this.crmService.saveTokens({
    //             refreshToken: x.data.refresh_token,
    //             accessToken: x.data.access_token,
    //             authCode
    //             })
    //         })
    // }
    
}
