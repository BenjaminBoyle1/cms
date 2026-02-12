import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentList } from './document-list/document-list';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [RouterOutlet, DocumentList],
  templateUrl: './documents.html',
  styleUrls: ['./documents.css']
})
export class Documents {}
