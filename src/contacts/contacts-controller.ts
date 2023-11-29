import { Body, Controller, Post } from '@nestjs/common';
import { ContactsService } from './contacts-service';
import { LeadsService } from 'src/leads/leads-service';
import { createContactRequest } from 'src/types/requestBody';

//В данном контроллере нах-ся метод, который надо было сделать по тестовому заданию.
@Controller('contacts')
export class ContactsController {
    constructor(
        private contactsService: ContactsService,
        private LeadsService: LeadsService
        ) {}
    
    //Тот самый метод. Принимает данные, соглансо ТЗ, ищет хотябы один true ответ, по параметру почта, телефон, если кандидат существует, то обновляет его данные, иначе создаёт нового.
    //Далее после создания или обновления метод плучает новый контакт и вызывает сервис по созданию сделки, куда передаёт id контакта. 
    @Post()
    async createOrUpdateContact(@Body() body: createContactRequest) {
        const existingContact = (await this.contactsService.findContact(body.email) || await this.contactsService.findContact(body.phone))
        if (existingContact) {
            const updatedContact = await this.contactsService.updateContactData(body, existingContact.id)
            return await this.LeadsService.createLead(updatedContact.id)
        }

        const newContact = await this.contactsService.createContact(body) 
        return await this.LeadsService.createLead(newContact.id)
    }
}
