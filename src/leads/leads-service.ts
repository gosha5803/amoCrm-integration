import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios-service';

@Injectable()
export class LeadsService {
    constructor(
        private axiosService: AxiosService
    ) {}

    //Метод по созданию сделки с определённым контактом, по его id.
    async createLead(contactId: number) {
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
                    }]
                )
            
            return data
        } catch (e) {
            console.log(e)
        }
    }
}
