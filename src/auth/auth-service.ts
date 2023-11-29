import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Tokens, TokensDocument } from 'src/models/tokens-model';
import { Model } from 'mongoose';
import axios from 'axios';
import { ITokens } from 'src/types/tokens';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Tokens.name) 
        private tokensModel: Model<TokensDocument>,
    ) {}

    //Данный метод хэширует и сохраняет токены в БД.
    async saveTokens(keys: ITokens) {
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

    //Метод для доступа к токенам, разкодирует и возвращает оба токена.
    async getTokens() {
        const data = await this.tokensModel.find()
        const tokens = {
            accesToken: data[0].accessToken,
            refreshToken: data[0].refreshToken
        }
        return tokens
    }

    //Метод, необходимый для использования в интерцепторе, для обновления "протухшего" accessToken с помощью рефреш токена. Он запрашивает новый токен, сохраняет новую пару через метод выше и возвращает пару токенов.
    async getTokensFromApi() {
        const tokens = await this.getTokens()
        try {
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
        } catch (e) {
            console.log(e)
        }
    }
}
