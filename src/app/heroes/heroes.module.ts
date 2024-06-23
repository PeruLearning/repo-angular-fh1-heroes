import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { HeroesLayoutComponent } from './layouts/heroes-layout.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    HeroCardComponent,

    // Layout
    HeroesLayoutComponent,

    // Pages
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroPageComponent,

    // Pipes
    HeroImagePipe,
    EditPageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
