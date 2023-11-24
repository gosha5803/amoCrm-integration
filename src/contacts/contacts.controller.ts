import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { AxiosError } from 'axios';
import { error } from 'console';
import { catchError, firstValueFrom } from 'rxjs';
import { TransformInterceptor } from 'src/INterceptors/logging.interceptor';
import { CrmIntegrationService } from 'src/crm-integration/crm-integration.service';
import { $api } from 'src/http';

@Controller('contacts')
export class ContactsController {
    constructor(
        private crmService: CrmIntegrationService,
        private httpService: HttpService,
        private authService: CrmIntegrationService
        ) {}
    
        @Get()
        @UseInterceptors(TransformInterceptor)
        async getContacts(): Promise<any> {
        const tokens = await this.crmService.getTokens()
        const { data } = await firstValueFrom(
            this.httpService.get<any>('https://godintzoff2015.amocrm.ru/api/v4/contacts', {
                headers: {
                    'Authorization': `Bearer esyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ0YzBkMzYwZTg5OGNiODczZWIyMDlhMjY2ZWEzM2U1ODEzZGZiYjllMmUwODM5NjU5YWQ5NzgxYWQ1ZmZkN2JkMGU5MzFiYjJiNGExYzg0In0.eyJhdWQiOiJkMDBiMjk3MC02NjJmLTQ5MjktOWYwZi03NTk4MTA0ZDFiYmMiLCJqdGkiOiI0NGMwZDM2MGU4OThjYjg3M2ViMjA5YTI2NmVhMzNlNTgxM2RmYmI5ZTJlMDgzOTY1OWFkOTc4MWFkNWZmZDdiZDBlOTMxYmIyYjRhMWM4NCIsImlhdCI6MTcwMDgxOTk2MiwibmJmIjoxNzAwODE5OTYyLCJleHAiOjE3MDA5MDYzNjIsInN1YiI6IjEwMzY0NzgyIiwiZ3JhbasanRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNDE4OTM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.hbcZElTN1nl8_edG5gETqOEoZ4WgSK4AKRfysUI_8T4NSOjQLFPFq2Hahkbn2ghTqzf-YJeGQATwdn3RcOzvcy7p73-84IBqsZk22sY_rA-THX9hVLXY_LIRuTRctTw4M4hh-QH75pibh0ijw0VDZX1uYHBvSlmt7oguekMfLKfTiYUpNRQ6ZK-u5MpgrUnvMh8fcKiEaVDW8WpwdR5du7VEPQ4vkSl3D5_6MpQXPk5docmIusmwUjEE5MXbYAWgwUcUYqdnsNShVzg6sHid3xOoqlrssAAoMeogpnFNybeb238MwMCXY6bsTN0IYhvVWE7Lhk9Lngn3isKIcljClQ`
                }})
            ) 
            return data
        }

}
