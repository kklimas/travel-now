import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private ERROR_MESSAGE = 'Something went wrong.';
  private SUCCESS_MESSAGE = 'Action invoked correctly.';
  private TOAST_CONFIG = {
    positionClass: 'toast-bottom-right',
  };

  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success(this.SUCCESS_MESSAGE, '', this.TOAST_CONFIG);
  }

  showError() {
    this.toastr.error(this.ERROR_MESSAGE, '', this.TOAST_CONFIG);
  }

  showInfo(message: string) {
    this.toastr.info(message, '', this.TOAST_CONFIG);
  }

  showWarning(message: string) {
    this.toastr.warning(message, '', this.TOAST_CONFIG);
  }
}
