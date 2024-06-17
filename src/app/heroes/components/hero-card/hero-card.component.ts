import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styles: ``
})
export class HeroCardComponent {

  @Input({
    required: true
  })
  public hero!: Hero;
}
