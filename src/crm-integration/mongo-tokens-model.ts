import {Schema} from 'mongoose'

export const TokensSchema = new Schema({
    refreshToken: String,
    accessToken: String
    // authId: String
})