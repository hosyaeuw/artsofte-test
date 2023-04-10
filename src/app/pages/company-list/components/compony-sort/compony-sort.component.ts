import { Component, Input } from '@angular/core';
import { SelectItem } from 'src/app/utils/SelectHelper';

@Component({
  selector: 'app-compony-sort',
  templateUrl: './compony-sort.component.html',
  styleUrls: ['./compony-sort.component.scss'],
})
export class ComponySortComponent {
  @Input() change?: (value: SelectItem['value']) => void;
  @Input() items: SelectItem[] = [];

  onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const value: SelectItem['value'] = target.value;
    this.change && this.change(value);
  }
}
