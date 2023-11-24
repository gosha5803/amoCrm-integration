import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TokensDoceument = HydratedDocument<Tokens>

@Schema()
export class Tokens {
    @Prop()
    accessToken: string

    @Prop()
    refreshToken: string

    // @Prop()
    // authId: string
}

export const TokensSchema = SchemaFactory.createForClass(Tokens)