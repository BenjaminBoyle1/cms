import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentItem } from '../document-item/document-item';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItem],
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css']
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Course Syllabus', 'Course overview and policies', 'https://example.com/syllabus', []),
    new Document('2', 'Project Requirements', 'CMS project requirements', 'https://example.com/project', []),
    new Document('3', 'Lesson Notes', 'Weekly lesson notes', 'https://example.com/notes', []),
    new Document('4', 'Reference Guide', 'Helpful references', 'https://example.com/reference', []),
    new Document('5', 'Schedule', 'Important dates', 'https://example.com/schedule', [])
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
