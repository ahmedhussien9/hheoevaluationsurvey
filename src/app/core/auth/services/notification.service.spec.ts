import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from './notification.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('NotificationService', () => {
  let notificationService: NotificationService,
    httpTestingController: HttpTestingController,
    toastrService: jasmine.SpyObj<ToastrService>,
    notificationServiceSpy: any;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [
        NotificationService,
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();
    notificationService = TestBed.inject(NotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should test "showSuccess" method', () => {
    notificationService.showSuccess('hello world', 'hello');
    expect(toastrService.success).toHaveBeenCalledWith('hello world', 'hello');
  });
});
