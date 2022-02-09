import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string = 'Success ', note: string = ''): void {
    this.toastr.success(message, note);
  }

  showError(message: string = 'Error ', note: string = 'حدث خطأ'): void {
    this.toastr.error(message, note, {
      timeOut: 3000,
    });
  }
}
