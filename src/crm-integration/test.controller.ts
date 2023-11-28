import { Controller, Post, Body, Get } from '@nestjs/common';
import { createContactRequest } from 'src/types/requestBody';
import { ContactsService } from 'src/contacts/contacts.service';
import { LeadsService } from 'src/leads/leads-service';

@Controller('test')
export class TestController {
    constructor(
        private contactsService: ContactsService,
        private LeadsService: LeadsService
        ) {}
    

    @Post()
    async createOrUpdateContact(@Body() body: createContactRequest) {
        const candidate = (await this.contactsService.findContact(body.email) || await this.contactsService.findContact(body.phone))
        if (candidate) {
            const updatedContact = await this.contactsService.updateContactData(body, candidate.id)
            return await this.LeadsService.createLead(updatedContact.id)
        }

        const newContact = await this.contactsService.createContact(body) 
        return await this.LeadsService.createLead(newContact.id)
    }

    @Get()
    async testGet() {
        return await this.contactsService.patchContact()
    }

}
