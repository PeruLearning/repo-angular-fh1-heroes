import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error-404-page/error-404-page.component';
import { authCanActivateGuard, authCanMatchGuard } from './auth/guards/auth.guard';
import { publicCanActivateGuard, publicCanMatchGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(c => c.AuthModule),
    canActivate: [publicCanActivateGuard],
    canMatch: [publicCanMatchGuard]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(c => c.HeroesModule),
    canActivate: [authCanActivateGuard],
    canMatch: [authCanMatchGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
