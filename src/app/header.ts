import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownDirective],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {}
