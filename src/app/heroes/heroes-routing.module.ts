import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
