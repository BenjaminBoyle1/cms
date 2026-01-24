import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  templateUrl: './message-edit.html'
})
export class MessageEdit {

  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Benjamin Boyle';

  onSendMessage() {
    const newMessage = new Message(
      Math.random().toString(),
      this.subject.nativeElement.value,
      this.msgText.nativeElement.value,
      this.currentSender
    );

    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
