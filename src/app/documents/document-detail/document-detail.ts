import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document';
import { WindRefService } from '../../wind-ref';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.css']
})
export class DocumentDetail implements OnInit {
  document: Document | null = null;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRef: WindRefService
  ) {}

  ngOnInit() {
    this.nativeWindow = this.windRef.getNativeWindow();

    this.route.params.subscribe(params => {
      const id: string = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView() {
    if (this.document) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }
}
