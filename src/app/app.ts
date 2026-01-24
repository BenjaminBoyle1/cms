import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from './header';
import { Documents } from './documents/documents';
import { MessageList } from './messages/message-list/message-list';
import { Contacts } from './contacts/contacts';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [CommonModule, Header, Documents, MessageList, Contacts],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  selectedFeature: string = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
