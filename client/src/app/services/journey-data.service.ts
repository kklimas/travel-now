import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Journey } from '../models/Journey';
import { BasketItem } from '../models/BasketItem';

@Injectable({
  providedIn: 'root',
})
export class JourneyDataService {
  private BASE_URL = 'http://localhost:3000';
  private JOURNEYS = '/journeys';
  private RESERVATE = '/buy';
  
  refresh: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private httpClient: HttpClient
  ) {}

  getJourneys(): Observable<Journey[]> {
    return this.httpClient.get<Journey[]>(`${this.BASE_URL}${this.JOURNEYS}`);
  }

  getJourney(id: string): Observable<Journey> {
    return this.httpClient.get<Journey>(
      `${this.BASE_URL}${this.JOURNEYS}/${id}`
    );
  }

  addJourney(journey: Journey): Observable<Journey> {
    return this.httpClient.post<Journey>(
      `${this.BASE_URL}${this.JOURNEYS}`,
      journey
    );
  }

  deleteJourney(id: string): Observable<Journey> {
    return this.httpClient.delete<Journey>(`${this.BASE_URL}${this.JOURNEYS}/${id}`);
  }

  buyJourneys(items: BasketItem[]): Observable<any> {
    return this.httpClient.post<Journey>(
      `${this.BASE_URL}${this.JOURNEYS}${this.RESERVATE}`,
      items
    );
  }
}
