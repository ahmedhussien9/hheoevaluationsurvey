import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUserLogin } from '../interfaces/IUserLogin.interface';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const formValidationMsgs = {
  username: `من فضلك أسم المستخدم مطلوب`,
  password: 'من فضلك كلمة المرور مطلوبة',
  passwordMinLength: 'من فضلك كلمة المرور يجب الإ تكون أقل من 8 حروف أو أرقام',
};

enum controlKeys {
  password = 'password',
  username = 'username',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  validationMsg = formValidationMsgs;
  private $destroy = new Subject<any>();

  constructor(
    private fg: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fg.group({
      [controlKeys.username]: ['', Validators.required],
      [controlKeys.password]: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  ngOnInit(): void {}

  isFormHasError(key: string, value: string): boolean {
    return this.loginForm.get(key).hasError(value);
  }

  onSubmitStart(): void {
    this.loading = true;
    this.submitted = true;
  }

  validateForm(): boolean {
    let isNotValid = false;
    if (this.isFormHasError(controlKeys.username, 'required')) {
      this.notificationService.showError(this.validationMsg.username);
    }

    if (this.isFormHasError(controlKeys.password, 'required')) {
      this.notificationService.showError(this.validationMsg.password);
    }

    if (this.isFormHasError(controlKeys.password, 'minlength')) {
      this.notificationService.showError(this.validationMsg.passwordMinLength);
    }

    if (this.loginForm.invalid) {
      this.loading = false;
      isNotValid = true;
      this.cdr.detectChanges();
    }
    return isNotValid;
  }

  submit() {
    this.onSubmitStart();

    if (this.validateForm()) {
      return;
    }

    const body: IUserLogin = this.getFormValues() as IUserLogin;

    this._authService
      .login(body)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        (res) => {
          this.onFormSuccess(res['body'].jwt);
        },
        (err) => {
          this.loading = false;
          this.cdr.detectChanges();
          this.notificationService.showError(
            err.error.message || 'Something went wrong!'
          );
        }
      );
  }

  onFormSuccess(jwt: string): void {
    this.loading = false;
    this.notificationService.showSuccess('مرحباً، نتمنى لك يوماً رائع');
    this._authService.saveToken(jwt);
    this.router.navigate(['dashboard']);
    this.cdr.detectChanges();
  }

  getFormValues(): IUserLogin {
    return {
      [controlKeys.username]: this.loginForm.value.username,
      [controlKeys.password]: this.loginForm.value.password,
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
