import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number = 0;

  private dbUrl = 'https://bbcms-25728-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  getMessages(): Message[] {
    this.http.get<Message[]>(this.dbUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

    return this.messages.slice();
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.dbUrl, messagesJson, { headers }).subscribe(() => {
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }

  getMessage(id: string): Message | null {
    for (const msg of this.messages) {
      if (msg.id === id) {
        return msg;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const msg of this.messages) {
      const currentId = parseInt(msg.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addMessage(message: Message) {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
}