import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth-module";
import { ContactsModule } from "./contacts/contacts-module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        AuthModule,
        ContactsModule
    ],
})
export class AppModule {}