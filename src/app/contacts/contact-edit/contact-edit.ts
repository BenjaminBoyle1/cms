import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact';

// ✅ ADD THIS
import { ContactItem } from '../contact-item/contact-item';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  // ✅ ADD ContactItem HERE
  imports: [CommonModule, FormsModule, ContactItem],
  templateUrl: './contact-edit.html',
  styleUrls: ['./contact-edit.css']
})
export class ContactEdit implements OnInit {
  originalContact: Contact | null = null;

  // not nullable, avoids “this.contact possibly null”
  contact: Contact = new Contact('', '', '', '', '', []);

  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const idParam = params['id'];

      if (!idParam) {
        this.editMode = false;
        this.originalContact = null;
        this.contact = new Contact('', '', '', '', '', []);
        this.groupContacts = [];
        return;
      }

      this.id = idParam;
      const found = this.contactService.getContact(this.id);

      if (!found) {
        this.router.navigateByUrl('/contacts');
        return;
      }

      this.editMode = true;
      this.originalContact = found;

      this.contact = JSON.parse(JSON.stringify(found));

      if (this.contact.group && this.contact.group.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      } else {
        this.groupContacts = [];
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newContact = new Contact(
      '',
      value.name || '',
      value.email || '',
      value.phone || '',
      value.imageUrl || '',
      this.groupContacts
    );

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigateByUrl('/contacts');
  }

  onCancel() {
    this.router.navigateByUrl('/contacts');
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }
}