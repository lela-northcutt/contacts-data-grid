import { Contact } from './contact.model';
import { Subject } from 'rxjs';

export class ContactsService {
    private contacts: Contact[] = [
        { firstName: 'Lela', lastName: 'Northcutt', jobTitle: 'softeware dev', phoneNumber: '(404) 358-8062', streetAddress: 'rankin oaks', city: 'charlotte', state: 'NC', zipCode: '28213' },
        { firstName: 'Marshall', lastName: 'Northcutt', jobTitle: 'author', phoneNumber: '(704) 123-1234', streetAddress: 'rankin oaks', city: 'charlotte', state: 'NC', zipCode: '28213' },
        { firstName: 'Ella', lastName: 'Boroday', jobTitle: 'mom', phoneNumber: '(404) 345-2345', streetAddress: 'stream cut dr', city: 'lyman', state: 'SC', zipCode: '12345' },
        { firstName: 'Stephan', lastName: 'Boroday', jobTitle: 'builder', phoneNumber: '(404) 567-1234', streetAddress: 'stream cut dr', city: 'lyman', state: 'SC', zipCode: '12345' },
        { firstName: 'Dennis', lastName: 'Krasnyanskiy', jobTitle: 'builder', phoneNumber: '(404) 678-3456', streetAddress: 'somewhere', city: 'everywhere', state: 'NC', zipCode: '28213' },
    ];
    private contactsUpdated = new Subject<Contact[]>();

    getContacts() {
        return [...this.contacts];
    }

    getContactsUpdateListener() {
        return this.contactsUpdated.asObservable();
    }

    addContact(contact: Contact) {
        this.contacts.push(contact);
        this.contactsUpdated.next([...this.contacts]);
    }
}