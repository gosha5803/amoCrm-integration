import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { CrmIntegrationService } from 'src/crm-integration/crm-integration.service';
import { CrmIntegrationModule } from 'src/crm-integration/crm-integration.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [
    CrmIntegrationModule,
    HttpModule.registerAsync({
      useFactory:() => ({
        timeout: 5000,
        maxRedirects: 5
      })
    })
  ]
})
export class ContactsModule {}
