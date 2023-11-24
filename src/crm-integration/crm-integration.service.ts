import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { SecretKeys } from './tokens-model';
import { TokensDto } from 'src/dtos/tokensDto';
import { UserModel } from './userModel';
import { Tokens, TokensDoceument } from 'src/models/tokens-model';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CrmIntegrationService {
    constructor(
        @InjectModel(Tokens.name) private tokensModel: Model<TokensDoceument>,
        private httpService: HttpService
        ) {

    }

    async saveTokens(keys: TokensDto) {
        const existingTokens = await this.tokensModel.find()
        if(existingTokens) {
            const newTokens = await this.tokensModel.findByIdAndUpdate(existingTokens[0].id, {
                refreshToken: keys.refreshToken,
                accessToken: keys.accessToken
            })
            console.log('UPDATED')
            return newTokens + 'asas'
        }
        const tokens = await this.tokensModel.create(keys)
        return tokens
    }

    async getTokens() {
        const data = await this.tokensModel.find()
        const tokens = {
            accesToken: data[0].accessToken,
            refreshToken: data[0].refreshToken
        }
        return tokens
    }

    async getTokensFromApi() {
        const tokens = await this.getTokens()
        const { data } = await firstValueFrom(
            this.httpService.post('https://godintzoff2015.amocrm.ru/oauth2/access_token',
                {
                    client_id: process.env.INTEGRATION_ID,
                    client_secret: process.env.CRM_SECRET_KEY,
                    grant_type: 'refresh_token',
                    refresh_token: tokens.refreshToken,
                    redirect_uri: 'https://2bf9-82-209-106-45.ngrok-free.app/crm-integration'
                }).pipe(
                    catchError((error: AxiosError) => {
                        console.log(error)
                        throw error
                    })
                )
        )
        await this.saveTokens({
            refreshToken: data.refresh_token,
            accessToken: data.access_token
        })
        return {
            refreshToken: data.refresh_token,
            accessToken: data.access_token
        }
    }
}
