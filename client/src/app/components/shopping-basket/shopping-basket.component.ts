import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BasketItem } from "src/app/models/BasketItem";
import { Journey } from "src/app/models/Journey";
import { JourneyDataService } from "src/app/services/journey-data.service";
import { ShoppingBasketService } from "src/app/services/shopping-basket.service";
import { ToastService } from "src/app/services/toast.service";
import { ConfirmBuyDialogComponent } from "../dialogs/confirm-buy-dialog/confirm-buy-dialog.component";

@Component({
  selector: "app-shopping-basket",
  templateUrl: "./shopping-basket.component.html",
  styleUrls: ["./shopping-basket.component.css"],
})
export class ShoppingBasketComponent {
  availableJourneys: Journey[] = [];
  basket: BasketItem[] = [];
  filteredBasket: BasketItem[] = [];
  totalValue: number = 0;
  displayedColumns = ["name", "startDate", "endDate", "count", "cost"];
  itemsCount: number = 0;

  constructor(
    private journeyService: JourneyDataService,
    private shoppingBasketService: ShoppingBasketService,
    private responsive: BreakpointObserver,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.setBasket();
    this.shoppingBasketService.change.subscribe(() => {
      this.setBasket();
    });
    this.fetchJourneys();
  }

  public openBuyItemsDialog() {
    this.dialog.open(ConfirmBuyDialogComponent).afterClosed()
    .subscribe(bought => {
      if (bought) this.buyItems(); 
    })
  }

  public remove(item: BasketItem) {
    this.shoppingBasketService.removeItemsOfGivenId(item.journeyId);
    this.shoppingBasketService.change.emit();
    this.setBasket();
  }

  private fetchJourneys() {
    this.journeyService.getJourneys().subscribe({
      next: (data) => {
        this.availableJourneys = data;
        this.markUnActiveItems();
      },
      error: () => this.toastService.showError()
    })
  }

  private markUnActiveItems() {
    this.basket.forEach(item => {
      let journeyExists = this.availableJourneys.find(j => j._id === item.journeyId) !== undefined;
      if (!journeyExists) item.isActive = false;
    })
  }

  private buyItems() {
    let itemsToBuy = this.basket.filter(item => item.isActive);
    this.journeyService.buyJourneys(itemsToBuy).subscribe({
      next: () => {
        this.shoppingBasketService.removeItems();
        this.toastService.showSuccess();
      },
      error: () => this.toastService.showError()
    })
    
  }

  private setBasket() {
    this.getBasketItems();
    this.getBasketItemsCount();
  }

  private getBasketItems() {
    let initialValue = 0;
    this.basket = this.shoppingBasketService.getItems();
    this.filteredBasket = this.basket.filter(item => item.isActive);
    
    this.totalValue = this.filteredBasket
      .map((item) => item.costPerUnit * item.count)
      .reduce((acc, curr) => acc + curr, initialValue);
  }

  private getBasketItemsCount() {
    let initialValue = 0;
    this.itemsCount = this.filteredBasket
      .map(item => item.count)
      .reduce((acc, curr) => acc + curr, initialValue);
  }
}
