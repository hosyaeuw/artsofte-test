import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './pages/company-yandex-map/company-yandex-map.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ComponyItemComponent } from './pages/company-list/components/compony-item/compony-item.component';
import { ComponySortComponent } from './pages/company-list/components/compony-sort/compony-sort.component';
import { ComponyFilterComponent } from './pages/company-list/components/compony-filter/compony-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TypographyComponent } from './components/typography/typography.component';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyYandexMapComponent,
    LayoutComponent,
    ComponyItemComponent,
    ComponySortComponent,
    ComponyFilterComponent,
    TypographyComponent,
    HeaderComponent,
    NavMenuComponent,
    ToggleComponent,
    TooltipsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
