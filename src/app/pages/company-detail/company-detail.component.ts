import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/services/company/company.entity';
import { CompanyService } from 'src/app/services/company/company.service';

type ValueOf<T> = T[keyof T];

type Type = {
  label: string;
  value: ValueOf<Company>;
};

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent {
  company: Company | undefined;
  fields: Type[] = [];

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCompany();

    if (this.company) {
      this.fields = [
        {
          label: 'Слоган',
          value: this.company.catch_phrase,
        },
        {
          label: 'Вид деятельности',
          value: this.company.industry,
        },
        {
          label: 'Телефон',
          value: this.company.phone_number,
        },
        {
          label: 'Адрес',
          value: this.company.full_address,
        },
      ];
    }
  }

  getCompany(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService
      .getCompanyById(id)
      .subscribe((company) => (this.company = company));
  }

  private _goBack(): void {
    this.location.back();
  }
  goBack = this._goBack.bind(this);
}
