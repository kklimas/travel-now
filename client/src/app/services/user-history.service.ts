import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, zip } from "rxjs";
import { HistoryRecord, Record } from "../models/HistoryRecord";
import { JourneyDataService } from "./journey-data.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class UserHistoryService {
  private BASE_URL = "http://localhost:3000";
  private HISTORY = "/history";

  constructor(private httpClient: HttpClient, private authService: AuthService, private journeyDateService: JourneyDataService) {}

    getHistory(): Observable<HistoryRecord[]> {
      return zip(this.journeyDateService.getJourneys(), this.getRecords())
        .pipe(map(([journeys, records]) => {
          let historyRecords: HistoryRecord[] = []
          records.forEach(r => {
            let historyRecord: HistoryRecord = new HistoryRecord();
            let journey = journeys.find(j => j._id === r.journeyId);
            if (journey) {
              historyRecord._id = r._id;
              historyRecord.username = r.username;
              historyRecord.journeyId = r.journeyId;
              historyRecord.tickets = r.tickets;
              historyRecord.orderDate = r.orderDate;
              historyRecord.journeyName = journey.name;
              historyRecord.startDate = journey.startDate;
              historyRecord.endDate = journey.endDate;
              historyRecords.push(historyRecord);
            }
            
          })
          return historyRecords;
        }))
      }

  private getRecords(): Observable<Record[]> {
    return this.httpClient.get<Record[]>(
      `${this.BASE_URL}${this.HISTORY}`
    );
  }
}
