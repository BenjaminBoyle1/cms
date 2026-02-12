import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactList } from './contact-list/contact-list';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [RouterOutlet, ContactList],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css']
})
export class Contacts {}
