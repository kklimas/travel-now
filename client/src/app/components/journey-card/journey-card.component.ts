import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Journey } from 'src/app/models/Journey';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { RemoveJourneyDialogComponent } from '../dialogs/remove-journey-dialog/remove-journey-dialog.component';
import { ShoppingBasketService } from 'src/app/services/shopping-basket.service';
import { AddCommentDialogComponent } from '../dialogs/add-comment-dialog/add-comment-dialog.component';
import { JourneyCommentService } from 'src/app/services/journey-comment.service';
import { JourneyDataService } from 'src/app/services/journey-data.service';

@Component({
  selector: 'app-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.css'],
})
export class JourneyCardComponent implements OnInit {
  @Output() journeyDeleted: EventEmitter<Journey> = new EventEmitter<Journey>();
  
  @Input() journey: Journey;
  @Input() minCost: number;
  @Input() maxCost: number
  isSmallWidth: boolean = false;
  canAdd: boolean = false;
  canRemove: boolean = false;
  ticketsInBasket: number = 0;

  constructor(
    private responsive: BreakpointObserver,
    private dialog: MatDialog,
    private shoppingBasketService: ShoppingBasketService,
    private journeyCommentService: JourneyCommentService,
    private journeyDataService: JourneyDataService
  ) {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        this.isSmallWidth = true;
      } else {
        this.isSmallWidth = false;
      }
    });
  }
  ngOnInit(): void {
    this.checkActions();
  }
  openDeleteDialog() {
    this.dialog
      .open(RemoveJourneyDialogComponent, {
        width: '250px',
        data: this.journey,
      })
      .afterClosed()
      .subscribe((deleted) => {
        if (deleted) {
          this.journeyDeleted.emit(this.journey);
          this.shoppingBasketService.removeItemsOfGivenId(this.journey._id);
          this.shoppingBasketService.change.emit();
          this.journeyCommentService.commentEvent.emit();
        }
      });
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
  isTooLate() {
    let currentDate = new Date();
    let jDate = new Date(this.journey.startDate)
    return jDate.getTime() < currentDate.getTime();
  }
  checkIfCanAdd() {
    this.canAdd = this.journey.ticketsLeft > 0 && !this.isTooLate();
  }
  checkIfCanRemove() {
    this.canRemove = this.shoppingBasketService.canRemove(this.journey._id);
  }
  itemsInBasket() {
    return this.shoppingBasketService.itemsInBasket(this.journey._id);
  }

  openAddCommentDialog() {
    this.dialog
      .open(AddCommentDialogComponent, {
        width: '500px',
        data: this.journey,
      })
      .afterClosed()
      .subscribe((added) => {
        if (added) {
          this.journeyCommentService.commentEvent.emit();
          this.journeyDataService.refresh.emit();
        }
      });
  }

  array(n: number) {
    return new Array(n);
  }
}
