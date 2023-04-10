import { Component, Input } from '@angular/core';
import { Company } from 'src/app/services/company/company.entity';

@Component({
  selector: 'app-compony-item',
  templateUrl: './compony-item.component.html',
  styleUrls: ['./compony-item.component.scss'],
})
export class ComponyItemComponent {
  @Input() company?: Company;
}
