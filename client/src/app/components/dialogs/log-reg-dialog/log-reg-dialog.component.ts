import { Component, Inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserCreationDTO } from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-log-reg-dialog",
  templateUrl: "./log-reg-dialog.component.html",
  styleUrls: ["./log-reg-dialog.component.css"],
})
export class LogRegDialogComponent {
  dialogTitle: string = 'Sign up';
  form: FormGroup;
  isPasswordType: boolean = true;

  private passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  private loginRegex = "^[A-Za-z]\\w{4,14}$";

  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public isLoginDialog: boolean,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LogRegDialogComponent>,
    private toastService: ToastService
  ) {
    this.initForm();
    if (isLoginDialog) this.dialogTitle = 'Sign in';
  }

  get username() {
    return this.form.get('username')?.value;
  }

  get password() {
    return this.form.get('password')?.value;
  }

  get user() {
    let user: UserCreationDTO = new UserCreationDTO();
    user.username = this.username;
    user.password = this.password;
    return user;
  }

  controlHasError(control: string, error: string) {
    return this.form.get(control)?.hasError(error);
  }

  submit() {
    this.loading = true;
    if (this.isLoginDialog) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.authService.login(this.user).subscribe({
      next: (tokens) => {
        this.authService.setTokens(tokens);
        this.toastService.showSuccess()
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.loading = false;
        this.toastService.showErrorMessage("Credentials are invalid.")
        this.initForm();
      }
    });
  }
  
  register() {
    this.authService.register(this.user).subscribe({
      next: (tokens) => {
        this.authService.setTokens(tokens);
        this.toastService.showSuccess()
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.loading = false;
        this.toastService.showErrorMessage("Username is already taken.")
        this.initForm();
      }
    });
  }

  changeInputType() {
    this.isPasswordType = !this.isPasswordType;
  }

  checkPasswords: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => { 
    let pass = this.form.get('password')?.value;
    let confirmPass = control.value;
    
    return pass === confirmPass ? null : { notSame: true }
  }

  private initForm() {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      confirm: this.fb.control('')
    })
    
    if (!this.isLoginDialog) {
      this.form.get('username')?.addValidators(Validators.pattern(this.loginRegex))
      this.form.get('password')?.addValidators(Validators.pattern(this.passwordRegex))
      this.form.get('confirm')?.addValidators([Validators.required, this.checkPasswords])
    }
  }
}
