import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TestModule } from "./crm-integration/test.module";
import { AuthModule } from "./auth/auth-module";
import { ContactsModule } from "./contacts/contacts.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/testCase'),
        AuthModule,
        ContactsModule
    ],
})
export class AppModule {}