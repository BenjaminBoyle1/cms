import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: './header.html'
})
export class Header {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
}
