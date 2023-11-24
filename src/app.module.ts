import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CrmIntegrationModule } from './crm-integration/crm-integration.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { SecretKeys } from "./crm-integration/tokens-model";
import { UserModel } from "./crm-integration/userModel";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactsModule } from './contacts/contacts.module';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        CrmIntegrationModule,
        // SequelizeModule.forRoot({
        //     dialect: 'postgres',
        //     host: process.env.POSTGRES_HOST,
        //     port: +process.env.POSTGRES_PORT,
        //     username: process.env.POSTGRES_USER,
        //     password: process.env.POSTGER_PASSWORD,
        //     database: process.env.POSTGRES_DB,
        //     models: [SecretKeys, UserModel],
        //     autoLoadModels: true
        // })
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/testCase'),
        ContactsModule,
        TestModule
    ]
})
export class AppModule {}