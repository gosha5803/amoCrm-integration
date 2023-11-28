import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { AuthModule } from 'src/auth/auth-module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { LeadsModule } from 'src/leads/leads-module';


@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [
    AuthModule,
    ContactsModule,
    LeadsModule
  ]
})
export class TestModule {}
