import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  templateUrl: './message-edit.html'
})
export class MessageEdit {

  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  currentSender = 'Your Name';

  constructor(private messageService: MessageService) {}

  onSendMessage() {

    const newMessage = new Message(
      Math.random().toString(),
      this.subject.nativeElement.value,
      this.msgText.nativeElement.value,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
