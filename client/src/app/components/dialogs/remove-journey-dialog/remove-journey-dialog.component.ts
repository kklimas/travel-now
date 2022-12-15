import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Journey } from 'src/app/models/Journey';
import { JourneyDataService } from 'src/app/services/journey-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-remove-journey-dialog',
  templateUrl: './remove-journey-dialog.component.html'
})
export class RemoveJourneyDialogComponent {
  constructor(
    private journeyDataService: JourneyDataService,
    public dialogRef: MatDialogRef<RemoveJourneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public journey: Journey,
    private toastService: ToastService
  ) {}
  onYesClick() {
    this.journeyDataService.deleteJourney(this.journey._id).subscribe({
      next: () => this.toastService.showSuccess(),
      error: () => this.toastService.showError(),
    });
  }
}
