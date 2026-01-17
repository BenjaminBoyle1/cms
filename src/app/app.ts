import { Component } from '@angular/core';
import { Header } from './header';
import { Contacts } from './contacts/contacts';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [Header, Contacts],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
