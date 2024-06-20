import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrl: './heroes-layout.component.css'
})
export class HeroesLayoutComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', ulr: './list' },
    { label: 'Añadir', icon: 'add', ulr: './new-hero' },
    { label: 'Buscar', icon: 'search', ulr: './search' },
  ]

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  public get currentUser(): User | undefined {
    return this.service.currentUser;
  }

  public onLogout(): void {
    this.service.logout();
    this.router.navigateByUrl('/auth/login')
  }
}
