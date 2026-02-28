import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-edit.html',
  styleUrls: ['./document-edit.css']
})
export class DocumentEdit implements OnInit {
  originalDocument: Document | null = null;
  document: Document | null = null;
  editMode: boolean = false;
  id: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const idParam = params['id'];

      if (!idParam) {
        this.editMode = false;
        this.originalDocument = null;
        this.document = new Document('', '', '', '', []);
        return;
      }

      this.id = idParam;
      const found = this.documentService.getDocument(this.id);

      if (!found) {
        this.editMode = false;
        return;
      }

      this.editMode = true;
      this.originalDocument = found;
      this.document = JSON.parse(JSON.stringify(found));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document(
      '',
      value.name || '',
      value.description || '',
      value.url || '',
      []
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigateByUrl('/documents');
  }

  onCancel() {
    this.router.navigateByUrl('/documents');
  }
}