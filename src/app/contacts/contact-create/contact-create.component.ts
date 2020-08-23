import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../contacts.service';


@Component({
    selector: 'app-contact-create',
    templateUrl: './contact-create.component.html'
})

export class ContactCreateComponent {

    firstName = '';
    lastName = '';
    jobTitle = '';
    phoneNumber = '';
    streetAddress = '';
    city = '';
    state = '';
    zipCode = '';

    constructor(public contactsService: ContactsService) { }

    onAddContact(form: NgForm) {
        const contact: Contact = {
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            jobTitle: form.value.jobTitle,
            phoneNumber: form.value.phoneNumber,
            streetAddress: form.value.streetAddress,
            city: form.value.city,
            state: form.value.state,
            zipCode: form.value.zipCode
        };
        this.contactsService.addContact(contact);
        form.resetForm();
    }
}