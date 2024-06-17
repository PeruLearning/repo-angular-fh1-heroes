import { Component } from '@angular/core';

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
}
