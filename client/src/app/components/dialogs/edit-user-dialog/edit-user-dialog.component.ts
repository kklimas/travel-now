import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { User, UserRole } from "src/app/models/User";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-edit-user-dialog",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.css"],
})
export class EditUserDialogComponent {
  private passwordRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  private loginRegex = "^[A-Za-z]\\w{4,14}$";

  editForm: FormGroup;
  roles: number[] = [0, 1, 2];

  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private toastService: ToastService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.editForm = this.fb.group({
      username: this.fb.control(this.user.username, [
        Validators.required,
        Validators.pattern(this.loginRegex),
      ]),
      passwordChange: this.fb.control(false),
      role: this.fb.control(this.user.role, Validators.required),
      status: this.fb.control(this.user.banned, Validators.required),
    });
    this.editForm
      .get("passwordChange")
      ?.valueChanges.subscribe(() => this.change());
  }

  submit() {
    this.loading = true;
    this.userService.editUser(this.edittedUser).subscribe({
      complete: () => {
        this.toastService.showSuccess();
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.loading = false;
        this.dialogRef.close(false);
        this.toastService.showError();
      },
    });
  }

  controlHasError(control: string, error: string) {
    return this.editForm.get(control)?.hasError(error);
  }

  change() {
    if (this.passwordChange) {
      this.editForm.addControl(
        "password",
        this.fb.control("", [
          Validators.required,
          Validators.pattern(this.passwordRegex),
        ])
      );
    } else {
      this.editForm.removeControl("password");
    }
  }

  get edittedUser() {
    let user = new User();
    user._id = this.user._id;
    user.username = this.username;
    user.password =
      this.password != "" && this.password != null
        ? this.password
        : this.user.password;
    user.role = this.role;
    user.banned = this.status;
    
    return user;
  }

  get username() {
    return this.editForm.get("username")?.value;
  }

  get passwordChange() {
    return this.editForm.get("passwordChange")?.value;
  }

  get password() {
    return this.editForm.get("password")?.value;
  }

  get role() {
    return this.editForm.get("role")?.value;
  }

  get status() {
    return this.editForm.get("status")?.value;
  }
}
