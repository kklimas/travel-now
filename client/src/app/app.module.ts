import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JourneyListComponent } from './components/journey-list/journey-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { JourneyCardComponent } from './components/journey-card/journey-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { RemoveJourneyDialogComponent } from './components/dialogs/remove-journey-dialog/remove-journey-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { ShoppingBasketComponent } from './components/shopping-basket/shopping-basket.component';
import { JourneyFilterPipe } from './data/pipes/journey-filter.pipe';
import { JourneyFilterComponent } from './components/journey-filter/journey-filter.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { JourneyCommentComponent } from './components/journey-comment/journey-comment.component';
import { JourneyCommentListComponent } from './components/journey-comment-list/journey-comment-list.component';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';
import { AddCommentDialogComponent } from './components/dialogs/add-comment-dialog/add-comment-dialog.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { JourneyDetailsComponent } from './components/journey-details/journey-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatMenuModule} from '@angular/material/menu';
import { LayoutComponent } from './components/layout/layout.component'; 
import {MatDividerModule} from '@angular/material/divider';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ShoppingBasketCardComponent } from './components/shopping-basket-card/shopping-basket-card.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { AppRoutingModule } from './app-routing.module'; 
import { MatChipsModule } from '@angular/material/chips';
import { StatusColorPipe } from './data/pipes/status-color.pipe';
import { StatusTextPipe } from './data/pipes/status-text.pipe';
import { StatusFilterPipe } from './data/pipes/status-filter.pipe';
import { ErrorMessagePipe } from './data/pipes/error-message.pipe'
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { LogRegDialogComponent } from './components/dialogs/log-reg-dialog/log-reg-dialog.component';
import { LogoutDialogComponent } from './components/dialogs/logout-dialog/logout-dialog.component';
import { AuthInterceptor } from './utils/auth.interceptor';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddJourneyDialogComponent } from './components/dialogs/add-journey/add-journey.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RoleToStringPipe } from './data/pipes/role-to-string.pipe';
import { RoleToColorPipe } from './data/pipes/role-to-color.pipe';
import { EditUserDialogComponent } from './components/dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserFilterPipe } from './data/pipes/user-filter.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditJourneyDialogComponent } from './components/dialogs/edit-journey-dialog/edit-journey-dialog.component'; 

@NgModule({
  declarations: [
    AppComponent,
    JourneyListComponent,
    JourneyCardComponent,
    RemoveJourneyDialogComponent,
    ShoppingBasketComponent,
    JourneyFilterPipe,
    JourneyFilterComponent,
    JourneyCommentComponent,
    JourneyCommentListComponent,
    NoDataFoundComponent,
    AddCommentDialogComponent,
    JourneyDetailsComponent,
    HomeComponent,
    LayoutComponent,
    ConfirmDialogComponent,
    ShoppingBasketCardComponent,
    UserHistoryComponent,
    StatusColorPipe,
    StatusTextPipe,
    StatusFilterPipe,
    ErrorMessagePipe,
    PageHeaderComponent,
    LogRegDialogComponent,
    LogoutDialogComponent,
    UserDetailsComponent,
    AddJourneyDialogComponent,
    UsersListComponent,
    RoleToStringPipe,
    RoleToColorPipe,
    EditUserDialogComponent,
    UserFilterPipe,
    EditJourneyDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTooltipModule,
    LayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatSliderModule,
    MatOptionModule, 
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
