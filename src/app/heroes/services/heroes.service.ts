import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  public getSubggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?_limit=4`)
      .pipe(
        map(heroes => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase())))
      );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  public deleteHeroById(id: string): Observable<boolean> {

    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }
}