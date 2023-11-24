import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { HttpModule } from '@nestjs/axios';
import { CrmIntegrationModule } from 'src/crm-integration/crm-integration.module';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [
    HttpModule,
    CrmIntegrationModule
  ]
})
export class TestModule {}
