import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { AuthModule } from 'src/auth/auth-module';
import { AuthService } from 'src/auth/auth-service';
import { AxiosModule } from 'src/axios/axios-module';
import { LeadsModule } from 'src/leads/leads-module';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    ],
  imports: [
    AxiosModule,
    AuthModule,
    LeadsModule    
  ],
  exports: [ContactsService]
})
export class ContactsModule {
  constructor(private crmIntegration: AuthService) {}
  async getTokens() {
    const { accesToken } = await this.crmIntegration.getTokens()
  }
}
