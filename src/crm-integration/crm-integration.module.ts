import { Module } from '@nestjs/common';
import { CrmIntegrationController } from './crm-integration.controller';
import { CrmIntegrationService } from './crm-integration.service';
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from '@nestjs/mongoose'
import { SequelizeModule } from '@nestjs/sequelize'
import { SecretKeys } from './tokens-model';
import { UserModel } from './userModel';
import { Tokens, TokensSchema } from 'src/models/tokens-model';

@Module({
  controllers: [CrmIntegrationController],
  providers: [CrmIntegrationService],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000
      })
    }),
    // SequelizeModule.forFeature([SecretKeys, UserModel])
    MongooseModule.forFeature([{name: Tokens.name, schema: TokensSchema}])
  ],
  exports: [CrmIntegrationService]
})
export class CrmIntegrationModule {}
