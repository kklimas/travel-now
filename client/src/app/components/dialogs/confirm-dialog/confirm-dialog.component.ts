import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  title: string = 'Confirm';
  message: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) private mess: string) {
    this.message = mess;
  }
}