import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() name = 'toggle';
  @Input() size = 'm';
  @Input() label?: string;
  @Input() change?: (isChecked: boolean) => void;
  isChecked = false;

  onChange() {
    this.isChecked = !this.isChecked;
    this.change && this.change(this.isChecked);
  }
}
