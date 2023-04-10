import { Component } from '@angular/core';
import {
  Company,
  CoordinateType,
} from 'src/app/services/company/company.entity';
import { CompanyService } from 'src/app/services/company/company.service';

const coordsToArray = (coords: CoordinateType) => [
  coords.latitude,
  coords.longitude,
];

declare const L: any;

@Component({
  selector: 'app-company-yandex-map',
  templateUrl: './company-yandex-map.component.html',
  styleUrls: ['./company-yandex-map.component.scss'],
})
export class CompanyYandexMapComponent {
  companies: Company[] = [];
  selectedCompany?: Company;
  private map: typeof L;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    const mapElem = document.getElementById('map');

    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;

      if (mapElem && companies.length > 1) {
        const selectedCompany = companies[0];
        this.selectedCompany = selectedCompany;
        this.map = L.map(mapElem).setView(
          coordsToArray(selectedCompany.coords),
          13
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
          this.map
        );

        companies.forEach((company) => {
          L.marker(coordsToArray(company.coords))
            .addTo(this.map)
            .bindPopup(company.title);
        });
      }
    });
  }

  onClick(e: MouseEvent) {
    const target = e.target as HTMLLIElement | HTMLUListElement;
    const li = target.closest('li');
    const id = Number(li?.dataset['companyId']);
    if (id) {
      const selectedCompany = this.companies.find(
        (company) => company.id === id
      );

      if (selectedCompany) {
        this.selectedCompany = selectedCompany;
        this.map.flyTo(coordsToArray(selectedCompany.coords));
      }
    }
  }
}
