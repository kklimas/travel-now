import { Component, Input } from '@angular/core';
import { JourneyComment } from 'src/app/models/Journey';
import { JourneyDataService } from 'src/app/services/journey-data.service';

@Component({
  selector: 'app-journey-comment',
  templateUrl: './journey-comment.component.html',
  styleUrls: ['./journey-comment.component.css']
})
export class JourneyCommentComponent {
  @Input() comment: JourneyComment;

  array(n: number) {return new Array(n)}
}
