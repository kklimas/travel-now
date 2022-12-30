import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    let min = this.minCost !== undefined ? this.minCost: 0;
    let max = this.maxCost !== undefined ? this.maxCost: Infinity;
    
    this.filterForm = new FormGroup({
      query: new FormControl(''),
      startDate: new FormControl(),
      endDate: new FormControl(),
      countries: new FormControl([]),
      stars: new FormControl([]),
      minCost: new FormControl(min),
      maxCost: new FormControl(max)
    })

    this.filterForm.valueChanges
      .subscribe(data => this.filterEvent.emit(this.validateFilter(data)))
  }

  formController(name: string) {
    return this.filterForm.get(name)?.value
  }

  clearFilters() {
    this.filterEvent.emit(new JourneyFilter());
    this.initForm();
  }
  
  private validateFilter(filter: JourneyFilter) {
    let newFilter = new JourneyFilter();
    if (filter.startDate == null) {
      filter.startDate = newFilter.startDate;
    }
    if (filter.endDate == null) {
      filter.endDate = newFilter.endDate;
    }
    return filter
  }

}
