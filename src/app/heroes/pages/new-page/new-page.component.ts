import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    superhero: new FormControl<string>('', { nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics, { nonNullable: true}),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC-Comics' },
    { id: 'Marvel Comics', desc: 'Marvel-Comics' }
  ]

  constructor(
    private service: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }

  public onSubmit(): void {
    if (this.heroForm.valid) {
      this.service.addHero(this.currentHero)
        .subscribe(hero => {
          this.snackBar.open(`'${hero.superhero}' creado.`, 'Cerrar', { duration: 2500 });
          this.router.navigate(['/heroes/edit', hero.id]);
        });
    }
  }

  public get currentHero(): Hero {
    const hero: Hero = this.heroForm.value as Hero;

    return hero;
  }
}
