import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Journey, JourneyComment } from "src/app/models/Journey";
import { JourneyCommentService } from "src/app/services/journey-comment.service";
import { JourneyDataService } from "src/app/services/journey-data.service";
import { ShoppingBasketService } from "src/app/services/shopping-basket.service";
import { ToastService } from "src/app/services/toast.service";
import { AddCommentDialogComponent } from "../dialogs/add-comment-dialog/add-comment-dialog.component";

@Component({
  selector: "app-journey-details",
  templateUrl: "./journey-details.component.html",
  styleUrls: ["./journey-details.component.css"],
})
export class JourneyDetailsComponent {
  journey: Journey = new Journey();
  isSmallWidth: boolean = false;

  imgIndex: number = 0;

  comments: JourneyComment[] = [];

  canAdd: boolean = false;
  canRemove: boolean = false;
  ticketsInBasket: number = 0;

  totalComments: number = 0;

  constructor(
    private journeyDataService: JourneyDataService,
    private commentsService: JourneyCommentService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private shoppingBasketService: ShoppingBasketService
  ) {
    this.journey.urls = []
    route.params.subscribe((data) => {
      this.journey._id = data["id"];
      if (this.journey._id) {
        this.getJourney(this.journey._id);
        this.getComments(this.journey._id);
      }
    });
    this.commentsService.commentEvent.subscribe(() =>
      this.getComments(this.journey._id)
    );
  }

  private getJourney(id: string) {
    this.journeyDataService.getJourney(id).subscribe({
      next: (journey) => {
        this.journey = journey;
        this.checkActions();
      },
      error: () => this.toastService.showError(),
    });
  }
  private getComments(id: string) {
    this.commentsService.getComments(id).subscribe({
      next: (comments) => {
        this.comments = comments
        let count = 0;
        let value = 0;
        comments.forEach(comment => {
          count++;
          value+=comment.stars;
        })
        this.totalComments = this.comments.length;
        this.journey.stars = count !== 0 ? Math.floor(value / count): 0;
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

  checkActions() {
    this.checkIfCanAdd();
    this.checkIfCanRemove();
    this.ticketsInBasket = this.itemsInBasket();
  }

  checkIfCanAdd() {
    let currentDate = new Date();
    let jDate = new Date(this.journey.startDate)
    this.canAdd = this.journey.ticketsLeft > 0 && (jDate.getTime() > currentDate.getTime());
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
