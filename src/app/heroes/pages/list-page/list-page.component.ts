import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  public constructor(private service: HeroesService) { }
  ngOnInit(): void {
    this.service.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
    })
  }

}
