import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number = 0;

  private dbUrl = 'https://bbcms-25728-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {}

  getContacts(): Contact[] {
    this.http.get<Contact[]>(this.dbUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts || [];
        this.maxContactId = this.getMaxId();

        this.contacts.sort((a: Contact, b: Contact) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

    return this.contacts.slice();
  }

  storeContacts() {
    const contactsJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.dbUrl, contactsJson, { headers }).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(newContact: Contact | null | undefined) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact | null | undefined, newContact: Contact | null | undefined) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact | null | undefined) {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}