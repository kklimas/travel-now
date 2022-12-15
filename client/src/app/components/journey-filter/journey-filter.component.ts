import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { JourneyFilter } from 'src/app/models/Journey';
import { JourneyDataService } from 'src/app/services/journey-data.service';

@Component({
  selector: 'app-journey-filter',
  templateUrl: './journey-filter.component.html',
  styleUrls: ['./journey-filter.component.css']
})
export class JourneyFilterComponent {
  @Output() filterEvent: EventEmitter<JourneyFilter> = new EventEmitter();
  @Input() countries: string[];
  @Input() maxCost: number;
  @Input() minCost: number; 

  filterForm: FormGroup;

  minStartDate: Date;
  minEndDate: Date;
  maxDate: Date;

  stars: number[] = [0, 1, 2, 3, 4, 5];

  constructor(
    private journeyDataService: JourneyDataService
  ) {
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.maxDate = new Date('2122-12-12');
    this.initForm();
    this.journeyDataService.refresh.subscribe(() => this.clearFilters());
  }

  initForm() {
    this.filterForm = new FormGroup({
      query: new FormControl(''),
      startDate: new FormControl(),
      endDate: new FormControl(),
      countries: new FormControl([]),
      stars: new FormControl([]),
      minCost: new FormControl(this.minCost),
      maxCost: new FormControl(this.maxCost)
    })

    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => this.filterEvent.emit(data))
  }

  formController(name: string) {
    return this.filterForm.get(name)?.value
  }

  clearFilters() {
    this.filterForm.reset();
    let j = new JourneyFilter();
    j.minCost = this.minCost;
    j.maxCost = this.maxCost;
    this.filterForm.get('minCost')?.setValue(this.minCost);
    this.filterForm.get('maxCost')?.setValue(this.maxCost);
    this.filterEvent.emit(j);
  }
  
}
