import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JourneyComment } from 'src/app/models/Journey';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-journey-comment-list',
  templateUrl: './journey-comment-list.component.html',
  styleUrls: ['./journey-comment-list.component.css']
})
export class JourneyCommentListComponent {
  @Input() user: User;
  @Input() comments: JourneyComment[] = [];
  @Output() commentDelete: EventEmitter<JourneyComment> = new EventEmitter();
}