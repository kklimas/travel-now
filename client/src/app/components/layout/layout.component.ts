import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { LogRegDialogComponent } from "../dialogs/log-reg-dialog/log-reg-dialog.component";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent {
  user: User;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.user = this.authService.getUser();
    this.authService.user.subscribe(() => {
      this.user = this.authService.getUser();
    });
  }

  openDialog(option: number) {
    this.dialog
      .open(LogRegDialogComponent, { data: option === 1 })
      .afterClosed()
      .subscribe((ok) => {
        if (ok) {
          this.router.navigate(["/home"]);
        }
      });
  }
}
