import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from './contact.model';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';
import { ContactService } from './contact';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [CommonModule, ContactList, ContactDetail],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css']
})
export class Contacts implements OnInit {
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
