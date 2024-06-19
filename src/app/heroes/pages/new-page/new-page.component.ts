import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC-Comics' },
    { id: 'Marvel Comics', desc: 'Marvel-Comics' }
  ]

  constructor(private service: HeroesService){}

  public onSubmit(): void {
    if (this.heroForm.valid) {
      if (this.heroForm.value.id) {
        this.service.updateHero(this.currentHero)
          .subscribe(hero => {
            // TODO: Mostrar Snackbar
          });

        return;
      }

      this.service.addHero(this.currentHero)
        .subscribe(hero => {
          // TODO: Mostrar Snackbar
        });
    }
  }

  public get currentHero(): Hero {
    const hero: Hero = this.heroForm.value as Hero;

    return hero;
  }
}
