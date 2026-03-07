import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact';
import { ContactItem } from '../contact-item/contact-item';
import { ContactsFilter } from '../contacts-filter-pipe';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactItem, ContactsFilter],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );

    this.contacts = this.contactService.getContacts();
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}