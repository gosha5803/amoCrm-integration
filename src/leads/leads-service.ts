import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth-service';
import { AxiosService } from 'src/axios/axios-service';

@Injectable()
export class LeadsService {
    constructor(
        private axiosService: AxiosService,
        private AuthService: AuthService
    ) {}

    async createLead(contactId: number) {
        const { accesToken } = await this.AuthService.getTokens()
        try {
            const { data } = await this.axiosService.$api().post(
                    `leads`,
                    [{
                        name: `Новая сделка (Создана автоматически)`,
                        _embedded: {
                            contacts: [
                                {
                                    id: contactId
                                }
                            ]
                        } 
                    }],
                    {
                        headers: {
                            'Authorization': `Bearer ${accesToken}`
                        }
                    }
                )
            
            return data
        } catch (e) {
            console.log(e.response.data['validation-errors'][0])
        }
    }
}
