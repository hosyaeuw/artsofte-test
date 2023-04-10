import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  navItems = [
    {
      url: '/list',
      text: 'Список',
    },
    {
      url: '/map',
      text: 'Карта',
    },
  ];
}
