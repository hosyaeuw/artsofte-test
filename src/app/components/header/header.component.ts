import { Component } from '@angular/core';
import { CacheType } from 'src/app/services/cache/CompanyCacheFactory';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggleLabel: CacheType = 'app';

  constructor(private serviceCompany: CompanyService) {}

  onToggleChange = this._onToggleChange.bind(this);
  _onToggleChange(isChecked: boolean) {
    if (isChecked) {
      this.toggleLabel = 'localhost';
    } else {
      this.toggleLabel = 'app';
    }
    this.serviceCompany.setChacheType(this.toggleLabel);
  }
}
