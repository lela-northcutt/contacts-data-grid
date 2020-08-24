import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { InjectFlags } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class ContactsService {
    private contacts: Contact[] = [
        // { id: '', firstName: '!Lela', lastName: 'Northcutt', jobTitle: 'softeware dev', phoneNumber: '(404) 358-8062', streetAddress: 'rankin oaks', city: 'charlotte', state: 'NC', zipCode: '28213' },
        // { id: '', firstName: '!Marshall', lastName: 'Northcutt', jobTitle: 'author', phoneNumber: '(704) 123-1234', streetAddress: 'rankin oaks', city: 'charlotte', state: 'NC', zipCode: '28213' },
        // { id: '', firstName: '!Ella', lastName: 'Boroday', jobTitle: 'mom', phoneNumber: '(404) 345-2345', streetAddress: 'stream cut dr', city: 'lyman', state: 'SC', zipCode: '12345' },
        // { id: '', firstName: '!Stephan', lastName: 'Boroday', jobTitle: 'builder', phoneNumber: '(404) 567-1234', streetAddress: 'stream cut dr', city: 'lyman', state: 'SC', zipCode: '12345' },
        // { id: '', firstName: 'Dennis', lastName: 'Krasnyanskiy', jobTitle: 'builder', phoneNumber: '(404) 678-3456', streetAddress: 'somewhere', city: 'everywhere', state: 'NC', zipCode: '28213' },
    ];
    private contactsUpdated = new Subject<Contact[]>();

    constructor(private http: HttpClient) { }

    getContacts() {
        this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/api/contacts')
            .subscribe((contactData) => {
                this.contacts = contactData.contacts;
                this.contactsUpdated.next([...this.contacts]);
            });
    }

    getContactsUpdateListener() {
        return this.contactsUpdated.asObservable();
    }

    addContact(contact: Contact) {
        this.http.post<{ message: string }>('http://localhost:3000/api/contacts', contact)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.contacts.push(contact);
                this.contactsUpdated.next([...this.contacts]);
            });
    }
}