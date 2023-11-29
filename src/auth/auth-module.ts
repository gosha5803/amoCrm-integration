import { Module } from '@nestjs/common';
import { AuthService } from './auth-service';
import { AuthController } from './auth-controllers';
import { MongooseModule } from '@nestjs/mongoose'
import { Tokens, TokensSchema } from 'src/models/tokens-model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{name: Tokens.name, schema: TokensSchema}]),
  ],
  exports: [AuthService]
})
export class AuthModule {}
