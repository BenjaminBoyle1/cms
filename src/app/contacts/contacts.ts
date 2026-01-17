import { Component } from '@angular/core';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [ContactList, ContactDetail],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css']
})
export class Contacts {}
