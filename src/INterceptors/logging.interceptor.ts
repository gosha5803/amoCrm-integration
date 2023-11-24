import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { CrmIntegrationService } from 'src/crm-integration/crm-integration.service';
import { $api } from 'src/http';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor(
        private authService: CrmIntegrationService,
        private http: HttpService
    ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    
    return next.handle()
    .pipe(
        catchError(async error => {
            if(error.response.data.status === 401) {
                try {
                    const originalUrl = error.config.url
                    const tokens = await this.authService.getTokensFromApi()
                    console.log(tokens)
                    
                    const { data } = await firstValueFrom(
                        this.http.get<any>(originalUrl, {
                            headers: {
                                'Authorization': `Bearer ${tokens.accessToken}`
                            }})
                        ) 
                    return data
                } catch (e) {
                    console.log(e)
                }
            }
            
        })
    )
  }
}