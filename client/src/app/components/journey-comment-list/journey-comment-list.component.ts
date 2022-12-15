import { Component, Input } from '@angular/core';
import { JourneyComment } from 'src/app/models/Journey';

@Component({
  selector: 'app-journey-comment-list',
  templateUrl: './journey-comment-list.component.html',
  styleUrls: ['./journey-comment-list.component.css']
})
export class JourneyCommentListComponent {

  @Input() comments: JourneyComment[] = [];
}
