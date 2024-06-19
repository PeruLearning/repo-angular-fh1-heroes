import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styles: ``
})
export class EditPageComponent implements OnInit {

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

  constructor(
    private service: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    const id = this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/');

        return this.heroForm.reset(hero);
      });
  }

  public onSubmit(): void {
    debugger;
    if (this.heroForm.valid) {
      this.service.updateHero(this.currentHero)
        .subscribe(hero => {
          this.snackBar.open(`'${hero.superhero}' actualizado.`, 'Done', { duration: 2500 });
        });
    }
  }

  public onDeleteHero(): void {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.service.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigateByUrl("/");
      });

    // dialogRef.afterClosed()
    //   .subscribe(result => {
    //     if (!result) return;
    //     this.service.deleteHeroById(this.currentHero.id)
    //       .subscribe(result => {
    //         if (result) {
    //           this.router.navigateByUrl("/");
    //         }
    //       });
    //   });
  }

  public get currentHero(): Hero {
    const hero: Hero = this.heroForm.value as Hero;

    return hero;
  }
}
