import { Module, forwardRef } from '@nestjs/common';
import { AxiosService } from './axios-service';
import { AuthModule } from '../auth/auth-module';

@Module({
  providers: [AxiosService],
  imports: [
    AuthModule
  ],
  exports: [AxiosService]
})
export class AxiosModule {}
