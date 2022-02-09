import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from '../auth-routing.module';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../services/notification.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const toastrService = {
    showError: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
    showSuccess: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [{ provide: NotificationService, useValue: toastrService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the count of the input elements', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#loginForm');
    const inputElement = formElement.querySelectorAll('input');
    expect(inputElement.length).toEqual(2);
  });

  it('should test the intial values for the login form', () => {
    const loginFormGroup = component.loginForm;
    const loginFormValues = {
      username: '',
      password: '',
    };
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it('should test the username required', () => {
    const loginFormGroup = component.loginForm;
    loginFormGroup.get('username').setValue('');
    expect(loginFormGroup.get('username').invalid).toBeTruthy();
  });

  it('should test the min length of the password', () => {
    const loginFormGroup = component.loginForm;
    loginFormGroup.get('password').setValue('123456');
    expect(loginFormGroup.get('password').valid).toBeFalsy();
    console.log(loginFormGroup.get('password').errors);
  });

  it('should test the password required', () => {
    const loginFormGroup = component.loginForm;
    loginFormGroup.get('password').setValue('');
    expect(loginFormGroup.get('password').invalid).toBeTruthy();
  });
});
