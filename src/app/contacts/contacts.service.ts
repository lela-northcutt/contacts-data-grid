import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class ContactsService {
    private contacts: Contact[] = [];
    private contactsUpdated = new Subject<Contact[]>();

    constructor(private http: HttpClient) { }

    getContacts() {
        this.http.get<{ message: string, contacts: Contact[] }>(environment.apiUrl)
            .subscribe((contactData) => {
                this.contacts = contactData.contacts;
                this.contactsUpdated.next([...this.contacts]);
            });
    }

    getContactsUpdateListener() {
        return this.contactsUpdated.asObservable();
    }

    // addContact(contact: Contact) {
    //     this.http.post<{ message: string }>('http://localhost:3000/api/contacts', contact)
    //         .subscribe((responseData) => {
    //             console.log(responseData.message);
    //             this.contacts.push(contact);
    //             this.contactsUpdated.next([...this.contacts]);
    //         });
    // }
}