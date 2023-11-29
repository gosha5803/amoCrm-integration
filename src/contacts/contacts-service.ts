import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios-service';
import { createContactRequest } from 'src/types/requestBody';


@Injectable()
export class ContactsService {
    constructor(
        private axios: AxiosService
        ) {}
        
        // Метод, возвращающий контакт, найденный по параметру номер телефона или email, в зависимости, от того, что в него передадут. Если контакт не найдет, просто выполняет return.
        async findContact(query: string) {
            try {
                const { data: contactCandidate } = await this.axios.$api().get(`contacts?query=${query}`)

                if(contactCandidate) {
                    return contactCandidate._embedded.contacts[0]
                }
                return 
            } catch (e) {
                console.log(e)
            }
        }

        //Данный метод отправляет запрос на обновление данных, всё согласно документации amoCrm. Возвращает контакт.
        async updateContactData(contact: createContactRequest, contactId: number) {
            try {
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
            } catch (e) {
                console.log(e)
            }
        }

        //Данный метод отправляет запрос на создание нового контакта, и возвращает деструктурированный ответ сервера, чтобы вернуть модель контакта. Далее нам потребуется его id.
        async createContact (contact: createContactRequest) {
            try {
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
            } catch (e) {
                console.log(e)
            }
        }
}
