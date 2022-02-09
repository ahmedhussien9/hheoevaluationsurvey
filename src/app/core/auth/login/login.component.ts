import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  constructor(
    private fg: FormBuilder,
    private toaster: ToastrService,
    private _authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fg.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  btnClicked() {
    this.router.navigate(['dash/products']);
  }

  submit() {
    this.loading = true;
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.invalid) {
      this.loading = false;
      this.toaster.error('من فضلك قم بملئ البيانات');
      return;
    }

    this._authService.login(body).subscribe(
      (res) => {
        this.loading = false;
        this.toaster.success('Welcome Back!');
        this._authService.saveToken(res['body'].jwt);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.loading = false;
        this.toaster.error(err.error.message || '');
        console.log(err);
      }
    );
  }
}
