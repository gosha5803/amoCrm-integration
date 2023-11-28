import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { TokensDto } from 'src/dtos/tokensDto';
import { Tokens, TokensDocument } from 'src/models/tokens-model';
import { Model } from 'mongoose';
import { AxiosService } from 'src/axios/axios-service';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Tokens.name) 
        private tokensModel: Model<TokensDocument>,
    ) {}

    async saveTokens(keys: TokensDto) {
        const existingTokens = await this.tokensModel.find()

        if(existingTokens) {
            const newTokens = await this.tokensModel.findByIdAndUpdate(existingTokens[0].id, {
                refreshToken: keys.refreshToken,
                accessToken: keys.accessToken
            })
            return newTokens
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
        const { data } = await axios.post('https://godintzoff2015.amocrm.ru/oauth2/access_token',
            {
                client_id: process.env.INTEGRATION_ID,
                client_secret: process.env.CRM_SECRET_KEY,
                grant_type: 'refresh_token',
                refresh_token: tokens.refreshToken,
                redirect_uri: process.env.REDIRECT_URL
            })

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
