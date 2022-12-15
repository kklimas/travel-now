import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Journey, JourneyComment } from 'src/app/models/Journey';
import { JourneyCommentService } from 'src/app/services/journey-comment.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent {

  stars: number[] = [1, 2, 3, 4, 5];

  commentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public journey: Journey,
    private toastService: ToastService,
    private journeyCommentService: JourneyCommentService,
    private commentService: JourneyCommentService
  ) {
    this.initForm();
  }

  initForm() {
    this.commentForm = new FormGroup({
      username: new FormControl('', Validators.required),
      journeyName: new FormControl({value: this.journey.name, disabled: true}),
      stars: new FormControl('', Validators.required),
      date: new FormControl(''),
      comment: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)])
    });
  }

  submit() {
    let comment: JourneyComment = new JourneyComment();
    comment.journeyId = this.journey._id;
    comment.journeyName = this.journey.name;
    comment.username = this.username;
    comment.text = this.comment;
    comment.stars = this.star;
    comment.userDate = this.date;
    console.log(this.date);
    

    this.journeyCommentService.addComment(comment).subscribe({
      next: () => {
        this.toastService.showSuccess()
        this.commentService.commentEvent.emit();
      },
      error: () => this.toastService.showError()
    })
    
  }

  get username() {
    return this.commentForm.get('username')?.value;
  }

  get star() {
    return this.commentForm.get('stars')?.value;
  }

  get comment() {
    return this.commentForm.get('comment')?.value;
  }

  get date() {
    return this.commentForm.get('date')?.value;
  }

  getErrorMessage(controlName: string) {
    let control = this.commentForm.get(controlName);
    if (control !== null) {

      if (control.hasError('required')) return 'Field is required';
      if (control.hasError('minlength')) return 'Content is too short';
      if (control.hasError('maxlength')) return 'Content is too long';
    }
    return '';
  }
}
