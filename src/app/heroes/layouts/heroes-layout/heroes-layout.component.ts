import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  templateUrl: './heroes-layout.component.html',
  styleUrl: './heroes-layout.component.css'
})
export class HeroesLayoutComponent implements OnInit {

  public _menuItems: MenuItem[] = []

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.service.getMenuItems().subscribe((items) => {
      this._menuItems = items;
    })
  }

  public get currentUser(): User | undefined {
    return this.service.currentUser;
  }

  public get menuItems(): MenuItem[] {
    return structuredClone(this._menuItems);
  }

  public onLogout(): void {
    this.service.logout();
    this.router.navigateByUrl('/auth/login')
  }
}
