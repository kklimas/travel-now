import { Component, Input } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ShoppingBasketService } from "src/app/services/shopping-basket.service";
import { UserHistoryService } from "src/app/services/user-history.service";
import { LogoutDialogComponent } from "../dialogs/logout-dialog/logout-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.css"],
})
export class PageHeaderComponent {
  @Input() userRole: number;
  @Input() username: string | null;
  title: string = "Home";
  totalTickets: number = 0;
  totalCost: number = 0;
  isJourneyNear: boolean = false;

  constructor(
    private router: Router,
    private shoppingBasketService: ShoppingBasketService,
    private userHistoryService: UserHistoryService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.handlePathChange();
    this.handleBasket();
    this.handlePlannedJourneys();
    this.shoppingBasketService.change.subscribe((res) => {
      this.handleBasket();
      if (res) {
        this.handlePlannedJourneys();
      }
    });
    
  }
  private handlePathChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case "/":
            this.title = "Home";
            break;
          case "/home":
            this.title = "Home";
            break;
          case "/journeys":
            this.title = "Journeys";
            break;
          case "/add-journey":
            this.title = "Add journey";
            break;
          case "/shopping-basket":
            this.title = "Shopping basket";
            break;
          case "/history":
            this.title = "History";
            break;
          case "/users":
            this.title = "Users";
            break;
          default:
            this.title = "Details";
            break;
        }
      }
    });
  }

  private handlePlannedJourneys() {
    if (this.userRole < 3) {
      this.userHistoryService.getHistory().subscribe({
        next: (data) => {
          if (data.length > 0) {
            let startDates = data.map((j) => j.startDate).sort();
  
            let currentDate = new Date();
            startDates.forEach((date) => {
              let d = new Date(date);
              if (d.getTime() > currentDate.getTime()) {
                if (
                  d.getFullYear() === currentDate.getFullYear() &&
                  d.getMonth() === currentDate.getMonth() &&
                  d.getDate() - currentDate.getDate() <= 3
                ) {
                  this.isJourneyNear = true;
                }
              }
            });
          }
        },
      });
    }
  }

  private handleBasket() {
    this.totalTickets = this.shoppingBasketService.getItemsCount();
    this.totalCost = this.shoppingBasketService.getItemsTotalCost();
  }

  openLogoutDialog() {
    this.dialog
      .open(LogoutDialogComponent)
      .afterClosed()
      .subscribe((loggedOut) => {
        if (loggedOut) {
          this.router.navigate(["/home"]);
          this.authService.logout();
          this.toastService.showSuccess();
        }
      })
  }
}
