import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItem } from '../message-item/message-item';
import { MessageEdit } from '../message-edit/message-edit';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItem, MessageEdit],
  templateUrl: './message-list.html'
})
export class MessageList {
  messages: Message[] = [
    new Message('1','Hi','Hello there','Admin'),
    new Message('2','Update','Assignment posted','Instructor')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
