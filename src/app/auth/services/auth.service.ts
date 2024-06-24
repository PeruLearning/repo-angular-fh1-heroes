import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { MenuItem } from '../../heroes/interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private user?: User;

  private menuItems: MenuItem[] = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  constructor(private http: HttpClient) { }

  public getMenuItems(): Observable<MenuItem[]> {
    return new Observable<MenuItem[]>((subscriber) => {
      subscriber.next(this.menuItems);
      subscriber.complete();
    });
  }

  public get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'eydfdfdfdsf.dftflsd454.rf445454f'))
      );
  }

  public logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

  public checkAuthenticationStatus(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((user) => this.user = user),
        map((user) => !!user),
        catchError((error) => of(false))
      );
  }
}
