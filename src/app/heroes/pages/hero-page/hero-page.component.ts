import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private service: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.service.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('heroes/list');

        return this.hero = hero;
      })
  }

  public goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }


}
