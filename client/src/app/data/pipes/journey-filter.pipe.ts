import { Pipe, PipeTransform } from '@angular/core';
import { Journey, JourneyFilter } from 'src/app/models/Journey';

@Pipe({
  name: 'journeyFilter',
})
export class JourneyFilterPipe implements PipeTransform {
  transform(journeys: Journey[], filter: JourneyFilter): Journey[] {
    return journeys.filter((item) => {
      let nameValid =
        filter.query !== '' && filter.query !== null
          ? item.name.toLowerCase().includes(filter.query.toLowerCase()) ||
            item.country.toLowerCase().includes(filter.query.toLowerCase()) ||
            item.description.toLowerCase().includes(filter.query.toLowerCase())
          : true;

      let countryValid =
        filter.countries !== null && filter.countries.length !== 0
          ? filter.countries.includes(item.country.toLowerCase())
          : true;

      let minCostValid = true;
      let maxCostValid = true;

      if (filter.minCost !== null && filter.minCost !== undefined) {
        minCostValid = filter.minCost <= item.cost;
      }

      if (filter.maxCost !== null && filter.maxCost !== undefined) {
        maxCostValid = filter.maxCost >= item.cost;
      }

      let startDateValid = true;
      let endDateValid = true;

      if (filter.startDate !== null && filter.startDate !== undefined) {
        startDateValid = filter.startDate <= new Date(item.startDate);
      }
      if (filter.endDate !== null && filter.endDate !== undefined) {
        endDateValid = filter.endDate >= new Date(item.endDate);
      }
      
      let starsValid = true;
      
      if (filter.stars !== null && filter.stars !== undefined && filter.stars.length !== 0) {
        starsValid = filter.stars.includes(item.stars);
      }

      return (
        nameValid &&
        countryValid &&
        minCostValid &&
        maxCostValid &&
        startDateValid &&
        endDateValid &&
        starsValid
      );
    });
  }
}
