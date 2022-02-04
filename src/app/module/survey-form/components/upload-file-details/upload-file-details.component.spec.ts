import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileDetailsComponent } from './upload-file-details.component';

describe('UploadFileDetailsComponent', () => {
  let component: UploadFileDetailsComponent;
  let fixture: ComponentFixture<UploadFileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
