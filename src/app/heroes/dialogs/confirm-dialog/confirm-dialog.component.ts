import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Hero,

    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) { }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
