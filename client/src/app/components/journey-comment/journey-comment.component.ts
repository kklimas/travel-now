import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JourneyComment } from 'src/app/models/Journey';
import { JourneyDataService } from 'src/app/services/journey-data.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-journey-comment',
  templateUrl: './journey-comment.component.html',
  styleUrls: ['./journey-comment.component.css']
})
export class JourneyCommentComponent {
  @Input() user: User;
  @Input() comment: JourneyComment;
  @Output() commentDelete: EventEmitter<JourneyComment> = new EventEmitter();


  constructor(private dialog: MatDialog) {}

  array(n: number) {return new Array(n)}

  openDialog() {
    this.dialog.open(ConfirmDialogComponent, {data: 'Are you sure to delete this comment?'})
      .afterClosed()
      .subscribe(deleted => {
        if (deleted) {
          this.commentDelete.emit(this.comment);
        }
      })
  }
}
