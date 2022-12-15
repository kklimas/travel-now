import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JourneyListComponent } from './components/journey-list/journey-list.component';
import { JourneyDetailsComponent } from './components/journey-details/journey-details.component';
import { AddJourneyComponent } from './components/add-journey/add-journey.component';
import { ShoppingBasketComponent } from './components/shopping-basket/shopping-basket.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'journeys', component: JourneyListComponent },
  { path: 'journeys/:id', component: JourneyDetailsComponent },
  { path: 'add-journey', component: AddJourneyComponent},
  { path: 'shopping-basket', component: ShoppingBasketComponent},
  { path: 'history', component: UserHistoryComponent},
  { path: '**', redirectTo: 'home'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
