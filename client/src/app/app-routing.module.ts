import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { JourneyListComponent } from "./components/journey-list/journey-list.component";
import { JourneyDetailsComponent } from "./components/journey-details/journey-details.component";
import { ShoppingBasketComponent } from "./components/shopping-basket/shopping-basket.component";
import { UserHistoryComponent } from "./components/user-history/user-history.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "journeys", component: JourneyListComponent },
  { path: "journeys/:id", component: JourneyDetailsComponent },
  {
    path: "shopping-basket",
    component: ShoppingBasketComponent,
    canActivate: [AuthGuard],
    data: {
      role: 2,
    },
  },
  {
    path: "history",
    component: UserHistoryComponent,
    canActivate: [AuthGuard],
    data: {
      role: 2,
    },
  },
  { path: "user", component: UserDetailsComponent },
  {
    path: "users",
    component: UsersListComponent,
    canActivate: [AuthGuard],
    data: { role: 0 },
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
