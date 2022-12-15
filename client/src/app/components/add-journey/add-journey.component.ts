import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Journey } from "src/app/models/Journey";
import { JourneyDataService } from "src/app/services/journey-data.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-add-journey",
  templateUrl: "./add-journey.component.html",
  styleUrls: ["./add-journey.component.css"],
})
export class AddJourneyComponent {
  INVALID_LENGTH = "Length should be greater.";

  minStartDate: Date;
  minEndDate: Date;
  maxDate: Date;
  journeyForm: FormGroup;

  constructor(
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
      name: new FormControl("", [Validators.minLength(2), Validators.required]),
      country: new FormControl("", [
        Validators.minLength(2),
        Validators.required,
      ]),
      cost: new FormControl(1, [Validators.required]),
      
      urls: this.fb.array([
        new FormGroup({
          url: new FormControl("", [Validators.required]),
        }),
      ]),
      tickets: new FormControl(1, [Validators.required]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
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
    let j = new Journey();
    j.name = this.name;
    j.country = this.country;
    j.cost = this.cost;
    let urls = (this.urls?.value);
    if (urls instanceof Array) {
      j.urls = urls.map(item => item.url)
    }

    j.ticketsLeft = this.tickets;
    j.description = this.description;
    j.startDate = this.startDate;
    j.endDate = this.endDate;
    return j;
  }

  startDateChange() {
    this.minEndDate = this.startDate;
  }
  endDateChange() {
    this.maxDate = this.endDate;
  }

  onFormSubmit() {
    this.journeyDataService.addJourney(this.journey).subscribe({
      next: () => {
        this.journeyDataService.refresh.emit();
        this.toastSevice.showSuccess();
        this.setForm();
      },
      error: () => this.toastSevice.showError(),
    });
  }
}
