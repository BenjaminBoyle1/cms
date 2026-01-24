import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItem } from '../document-item/document-item';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItem],
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css']
})
export class DocumentList {}
