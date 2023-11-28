import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TokensDocument = HydratedDocument<Tokens>

@Schema()
export class Tokens {
    @Prop()
    accessToken: string

    @Prop()
    refreshToken: string

}

export const TokensSchema = SchemaFactory.createForClass(Tokens)