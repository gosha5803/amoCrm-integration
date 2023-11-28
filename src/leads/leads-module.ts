import { Module } from '@nestjs/common';
import { LeadsController } from './leads-controller';
import { LeadsService } from './leads-service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth-module';
import { AxiosModule } from 'src/axios/axios-module';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
  imports: [
    AxiosModule,
    AuthModule
  ],
  exports: [
    LeadsService
  ]
})
export class LeadsModule {}
