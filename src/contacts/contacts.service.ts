import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios-service';
import { createContactRequest } from 'src/types/requestBody';

@Injectable()
export class ContactsService {
    constructor(
        private axios: AxiosService
        ) {}
        
        async patchContact() {
            const { data } = await this.axios.$api().get('https://jsonplaceholder.typicode.com/users')
            return data
        }
            
            async findContact(query: string) {
                const { data: contactCandidate } = 
                await this.axios.$api().get(`contacts?query=${query}`)

                if(contactCandidate) {
                    return contactCandidate._embedded.contacts[0]
                }
                return 
        }

    async updateContactData(contact: createContactRequest, contactId: number) {
        const { data } = await this.axios.$api().patch(`contacts/${contactId}`, {
                first_name: contact.name,
                custom_fields_values: [
                    {
                        field_name: 'Телефон',
                        field_code: 'PHONE',
                        values: [
                            {
                                value: contact.phone
                            }
                        ]
                    },
                    {
                        field_name: 'Почта',
                        field_code: 'EMAIL',
                        values: [
                            {
                                value: contact.email
                            }
                        ]
                    }
                ]
            })
        return data
    }

    async createContact (contact: createContactRequest) {
            const { data } = await this.axios.$api().post(
                'contacts', 
                [{
                    name: contact.name,
                    "custom_fields_values": [
                        {
                            field_code: "PHONE",
                            values: [
                                {   enum_code: "WORK",
                                    value: contact.phone
                                }
                            ]
                        },
                        {
                            field_code: "EMAIL",
                            values: [
                                {   enum_code: "WORK",
                                    value: contact.email
                                }
                            ]
                        }
                    ]
                }]
            )
            
            return data._embedded.contacts[0]
    }
}
