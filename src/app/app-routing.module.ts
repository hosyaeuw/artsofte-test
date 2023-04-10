import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './pages/company-yandex-map/company-yandex-map.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: CompanyListComponent },
  { path: 'detail/:id', component: CompanyDetailComponent },
  { path: 'map', component: CompanyYandexMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
