import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Journey } from 'src/app/models/Journey';
import { JourneyDataService } from 'src/app/services/journey-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-journey-dialog',
  templateUrl: './edit-journey-dialog.component.html',
  styleUrls: ['./edit-journey-dialog.component.css']
})
export class EditJourneyDialogComponent {
  INVALID_LENGTH = "Length should be greater.";

  minStartDate: Date;
  minEndDate: Date;
  maxDate: Date;
  journeyForm: FormGroup;

  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EditJourneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private j: Journey,
    private journeyDataService: JourneyDataService,
    private toastSevice: ToastService,
    private fb: FormBuilder
  ) {
    this.setForm();
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.maxDate = new Date("2122-12-12");
  }

  private setForm() {
    this.journeyForm = this.fb.group({
      name: new FormControl(this.j.name, [Validators.minLength(2), Validators.required]),
      country: new FormControl(this.j.country, [
        Validators.minLength(2),
        Validators.required,
      ]),
      cost: new FormControl(this.j.cost, [Validators.required]),
      
      urls: this.fb.array(this.j.urls.map(url => 
        new FormGroup({
          url: new FormControl(url, Validators.required)
        })
      )),

      tickets: new FormControl(this.j.ticketsLeft, [Validators.required]),
      startDate: new FormControl(this.j.startDate, [Validators.required]),
      endDate: new FormControl(this.j.endDate, [Validators.required]),
      description: new FormControl(this.j.description, [Validators.required]),
    })  
  }

  get name() {
    return this.journeyForm.get("name")?.value;
  }

  get country() {
    return this.journeyForm.get("country")?.value;
  }

  get cost() {
    return this.journeyForm.get("cost")?.value;
  }

  get urls() {
    return this.journeyForm.get("urls") as FormArray;
  }

  get tickets() {
    return this.journeyForm.get("tickets")?.value;
  }

  get description() {
    return this.journeyForm.get("description")?.value;
  }

  get startDate() {
    return this.journeyForm.get("startDate")?.value;
  }

  get endDate() {
    return this.journeyForm.get("endDate")?.value;
  }

  addUrl() {
    const url = this.fb.group({
      url: this.fb.control('', Validators.required)
    });
    this.urls.push(url);
  }
  removeUrl(id: number) {
    this.urls.removeAt(id);
  }

  get journey() {
    this.j.name = this.name;
    this.j.country = this.country;
    this.j.cost = this.cost;
    let urls = (this.urls?.value);
    if (urls instanceof Array) {
      this.j.urls = urls.map(item => item.url)
    }

    this.j.ticketsLeft = this.tickets;
    this.j.description = this.description;
    this.j.startDate = this.startDate;
    this.j.endDate = this.endDate;

    return this.j;
  }

  startDateChange() {
    this.minEndDate = this.startDate;
  }
  endDateChange() {
    this.maxDate = this.endDate;
  }

  onFormSubmit() {
    this.loading = true;
    const journey = this.journey;
    
    this.journeyDataService.editJourney(journey).subscribe({
      complete: () => {
        this.loading = false;
        this.dialogRef.close(true);
        this.toastSevice.showSuccess();
      },
      error: () => {
        this.loading = false;
        this.dialogRef.close(false)
        this.toastSevice.showError()
      },
    });
  }
}
