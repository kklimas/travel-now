import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Journey, JourneyComment } from "src/app/models/Journey";
import { JourneyCommentService } from "src/app/services/journey-comment.service";
import { JourneyDataService } from "src/app/services/journey-data.service";
import { ShoppingBasketService } from "src/app/services/shopping-basket.service";
import { ToastService } from "src/app/services/toast.service";
import { AddCommentDialogComponent } from "../dialogs/add-comment-dialog/add-comment-dialog.component";
import { AuthService } from "src/app/services/auth.service";
import { UserHistoryService } from "src/app/services/user-history.service";
import { HistoryRecord } from "src/app/models/HistoryRecord";
import { User } from "src/app/models/User";

@Component({
  selector: "app-journey-details",
  templateUrl: "./journey-details.component.html",
  styleUrls: ["./journey-details.component.css"],
})
export class JourneyDetailsComponent {
  user: User;
  journey: Journey;
  isSmallWidth: boolean = false;
  imgIndex: number = 0;
  comments: JourneyComment[] = [];
  canAdd: boolean = false;
  canRemove: boolean = false;
  ticketsInBasket: number = 0;
  totalComments: number = 0;
  canAddComment: boolean = false;

  constructor(
    private journeyDataService: JourneyDataService,
    private authService: AuthService,
    private commentsService: JourneyCommentService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private shoppingBasketService: ShoppingBasketService,
    private userHistoryService: UserHistoryService
  ) {
    this.user = this.authService.getUser();
 
    this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.route.params.subscribe((data) => {
      this.journey = new Journey();
      this.journey._id = data["id"];
      if (this.journey._id) {
        this.getJourney(this.journey._id);
        this.getComments(this.journey._id);
      }
    });
    this.commentsService.commentEvent.subscribe(() =>
      {this.getComments(this.journey._id)
        this.checkIfCanAddComment()}
    );
  }

  private getJourney(id: string) {
    this.journeyDataService.getJourney(id).subscribe({
      next: (journey) => {
        this.journey = journey;
        this.checkActions();
        if (this.user.role < 3) {
          this.checkIfCanAddComment();
        }
      },
      error: () => this.toastService.showError(),
    });
  }
  isTooLate() {
    let currentDate = new Date();
    let jDate = new Date(this.journey.startDate);
    return jDate.getTime() < currentDate.getTime();
  }

  private getComments(id: string) {
    this.commentsService.getComments(id).subscribe({
      next: (comments) => {
        this.comments = comments;
        let count = 0;
        let value = 0;
        comments.forEach((comment) => {
          count++;
          value += comment.stars;
        });
        this.totalComments = this.comments.length;
        this.journey.stars = count !== 0 ? Math.floor(value / count) : 0;
      },
      error: () => this.toastService.showError(),
    });
  }

  commentDelete(comment: JourneyComment) {
    this.commentsService.removeComment(comment._id).subscribe({
      next: () => {
        this.getComments(this.journey._id);
        this.toastService.showSuccess();
      },
      error: () => this.toastService.showError(),
    });
  }

  openAddCommentDialog() {
    this.dialog.open(AddCommentDialogComponent, {
      data: this.journey,
    });
  }

  array(n: number) {
    return Array(n);
  }
  addTicketToBasket() {
    this.shoppingBasketService.addItem(this.journey);
    this.journey.ticketsLeft--;
    this.checkActions();
  }

  removeTicketFromBasket() {
    this.shoppingBasketService.reduceItems(this.journey._id);
    this.journey.ticketsLeft++;
    this.checkActions();
  }

  checkIfCanAddComment() {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {
        this.canAddComment = this.check(data);
      },
      error: () => this.toastService.showError(),
    });
  }

  check(data: HistoryRecord[]) {
    
    const user: User | null = this.authService.getUser();
    
    // is logged and is not banned
    if (!user || user.banned) {
      return false;
    }
    
    const filteredRecords = data.filter(j => j.journeyId === this.journey._id && j.username === user.username)
  
    // user bought trip
    if (filteredRecords.length === 0) {
      return false
    }
    
    const takenJourney = filteredRecords.at(0);

    // trip ended and user does not have comment yet
    const currentDate = new Date();
    if (takenJourney) {
      let journeyDate = new Date(takenJourney.endDate);
      
      return journeyDate <= currentDate && this.comments.filter(c => c.username === this.user.username).length === 0;
    }
    
    return false
  }

  checkActions() {
    this.checkIfCanAdd();
    this.checkIfCanRemove();
    this.ticketsInBasket = this.itemsInBasket();
  }

  checkIfCanAdd() {
    let currentDate = new Date();
    let jDate = new Date(this.journey.startDate);
    this.canAdd =
      this.journey.ticketsLeft > 0 && jDate.getTime() > currentDate.getTime();
  }
  checkIfCanRemove() {
    this.canRemove = this.shoppingBasketService.canRemove(this.journey._id);
  }
  itemsInBasket() {
    return this.shoppingBasketService.itemsInBasket(this.journey._id);
  }
  next(i: number) {
    this.imgIndex += i;
    if (this.imgIndex == this.journey.urls.length) this.imgIndex = 0;
    if (this.imgIndex < 0) this.imgIndex = this.journey.urls.length - 1;
  }
}
