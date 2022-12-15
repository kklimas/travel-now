import { Component } from '@angular/core';
import { JourneyFilterPipe } from 'src/app/data/pipes/journey-filter.pipe';
import { Journey, JourneyCommentDTO, JourneyFilter } from 'src/app/models/Journey';
import { JourneyCommentService } from 'src/app/services/journey-comment.service';
import { JourneyDataService } from 'src/app/services/journey-data.service';
import { ShoppingBasketService } from 'src/app/services/shopping-basket.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.css'],
})
export class JourneyListComponent {
  journeys: Journey[] = [];
  countries: string[] = []
  filteredJourneys: Journey[] = [];
  filter: JourneyFilter = new JourneyFilter();
  pipe: JourneyFilterPipe = new JourneyFilterPipe();
  maxCost: number;
  minCost: number;

  constructor(
    private journeyService: JourneyDataService,
    private toastService: ToastService,
    private shoppingBasketService: ShoppingBasketService,
    private journeyCommentService: JourneyCommentService
  ) {
    this.getJourneys();
    journeyService.refresh.subscribe(() => {
      this.getJourneys();
    });
  }

  getJourneys() {
    this.journeyService.getJourneys().subscribe({
      next: (data) => {
        this.journeys = data;
        this.getStarsForJourneys();
        this.getTripCountries();
        this.removeTakenTickets();
        this.filterChange(this.filter);
        this.markJourneys();
      },
      error: () => {
        this.toastService.showError();
      },
    });
  }
  

  filterChange(filter: JourneyFilter) {
    this.filteredJourneys = this.pipe.transform(this.journeys, filter);
  }

  // remove tickets that were saved in storage
  private removeTakenTickets() {
    this.journeys.forEach(j => {
      j.ticketsLeft -= this.shoppingBasketService.itemsInBasket(j._id);
    })
  }

  private markJourneys() {
    let min = Infinity;
    let max = 0;
    this.filteredJourneys.forEach(j => {      
      if (j.cost > max) max = j.cost;
      if (j.cost < min) min = j.cost;
    });
    this.maxCost = max;
    this.minCost = min;
  }

  private getTripCountries() {
    let countriesData = new Set(this.journeys.map(j => j.country)) 
    this.countries = [...countriesData.keys()];
  }

  private getStarsForJourneys() {
    this.journeyCommentService.getAllComments().subscribe({
      next: comments => {
        let map = new Map();
        comments.forEach(c => {
          if (map.has(c.journeyId)) {
            let old: JourneyCommentDTO = map.get(c.journeyId);
            old.stars += c.stars;
            old.votes += 1
            map.delete(c.journeyId);
            map.set(c.journeyId, old);
          } else {
            let nw = new JourneyCommentDTO();
            nw.stars = c.stars;
            nw.votes = 1;
            map.set(c.journeyId, nw);
          }
        })
        this.journeys.forEach(j => {
          if (map.has(j._id)) {
            let comments: JourneyCommentDTO = map.get(j._id);
            j.stars = comments.votes != 0 ? Math.floor(comments.stars / comments.votes): 1;
            if (j.stars == 0) j.stars = 1;
          } else {
            j.stars = 0;
          }
        })
      },
      error: () => this.toastService.showError()
    })
  }
}
