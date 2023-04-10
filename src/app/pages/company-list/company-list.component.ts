import { Component } from '@angular/core';
import { Company } from 'src/app/services/company/company.entity';
import { CompanyService } from 'src/app/services/company/company.service';
import { SelectHelper, SelectItem } from 'src/app/utils/SelectHelper';
import { FormValues } from './components/compony-filter/compony-filter.component';

type FilterCompaniesItem = Omit<SelectItem, 'value'> & {
  value: keyof Company;
};

const items: FilterCompaniesItem[] = [
  {
    title: 'Название',
    value: 'business_name',
  },
  {
    title: 'Тип',
    value: 'type',
  },
  {
    title: 'Вид деятельности',
    value: 'industry',
  },
];

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent {
  companies: Company[] = [];
  sortedItems = SelectHelper.addClearOption(items);
  companyTypes: SelectItem[] = [];
  companyIndustries: SelectItem[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getIndustries();
    this.getTypes();
  }

  getIndustries(): void {
    this.companyService
      .getIndustries()
      .subscribe(
        (getIndustries) =>
          (this.companyIndustries = SelectHelper.addClearOption(
            SelectHelper.createOptionsIntoStrings(getIndustries)
          ))
      );
  }

  getTypes(): void {
    this.companyService
      .getTypes()
      .subscribe(
        (types) =>
          (this.companyTypes = SelectHelper.addClearOption(
            SelectHelper.createOptionsIntoStrings(types)
          ))
      );
  }

  getCompanies() {
    this.companyService
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));
  }

  onSortChange = this._onSortChange.bind(this);
  private _onSortChange(value: SelectItem['value']) {
    this.companyService
      .sortCompanies(value as FilterCompaniesItem['value'])
      .subscribe((companies) => (this.companies = companies));
  }

  onFilterChange = this._onFilterChange.bind(this);
  private _onFilterChange(values: FormValues) {
    this.companyService
      .filterCompanies(values)
      .subscribe((companies) => (this.companies = companies));
  }
}
