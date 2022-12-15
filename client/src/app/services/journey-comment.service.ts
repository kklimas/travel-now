import { Injectable, EventEmitter } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JourneyComment } from '../models/Journey';

@Injectable({
  providedIn: 'root'
})
export class JourneyCommentService {
  
  commentEvent: EventEmitter<any> = new EventEmitter();

  private BASE_URL = 'http://localhost:3000'
  private COMMENTS = '/comments'
  
  constructor(
    private httpClient: HttpClient,
    ) {}

  getAllComments(): Observable<JourneyComment[]> {
    return this.httpClient.get<JourneyComment[]>(`${this.BASE_URL}${this.COMMENTS}`)
  }

  getComments(id: string) {
    return this.getAllComments().pipe(map(data => data.filter(r => r.journeyId === id)));
  }

  addComment(comment: JourneyComment): Observable<JourneyComment> {
    return this.httpClient.post<JourneyComment>(`${this.BASE_URL}${this.COMMENTS}`, comment);  
  }

  removeComment(id: string): Observable<JourneyComment> {
    return this.httpClient.delete<JourneyComment>(`${this.BASE_URL}${this.COMMENTS}/${id}`);  
  }
  
}
