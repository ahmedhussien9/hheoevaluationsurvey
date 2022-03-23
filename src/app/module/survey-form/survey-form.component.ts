import { DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize, switchMap } from 'rxjs';

import { HttpSubmitSurveyService } from './services/http-survey.service';
import { TFormStatus } from 'src/app/module/surveys/types/TFormStatus.type';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FileUploadService } from './services/FileUpload.service';
import { NotificationService } from 'src/app/core/auth/services/notification.service';
import { FileType } from 'src/app/shared/models/FileUploadModels/File.types';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { arLocale, defineLocale } from 'ngx-bootstrap/chronos';
defineLocale("ar", arLocale); //only setting up Norwegian bokmaal (nb) in this sample

enum ToasterMessage {
  success = 'تم ارسال النموذج  بنجاح شكرا لكم',
  validationError = 'من فضلك قم بملئ النموذج!',
  uploadFileError = 'من فضلك قم برفع الملفات المطلوبة',
  isStillUploadingFile = 'برجاء انتظار تحميل الملفات',
}
export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, backgroundColor: '#f1f1f1' }),
        stagger('60ms', animate('600ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(':leave', animate('300ms', style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, HttpSubmitSurveyService],
  animations: [listAnimation],
})
export class SurveyFormComponent implements OnInit, AfterContentChecked {
  public userForm: FormGroup;
  firstSampleFiles: File[] = [];
  isSubmitted = false;
  loading = false;
  violations: any = [];
  maxDate = new Date();
  contractFiles: FileUploadService;
  securityProtocolsDocuments: FileUploadService;
  systemImages: FileUploadService;
  complainSugesionFiles: FileUploadService;
  constructor(
    private _fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private httpSubmiturveyService: HttpSubmitSurveyService,
    private notificationService: NotificationService,
    private router: Router,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('ar');
    this.initFilesInstancesWrap();
    this.maxDate = new Date();
    this.userForm = this._fb.group({
      organizationName: ['', [Validators.maxLength(255), Validators.required]],
      webSiteURL: ['', [Validators.maxLength(255), Validators.required]],
      websiteSoftwareCompany: [
        '',
        [Validators.maxLength(255), Validators.required],
      ],
      websiteHostDetails: [
        '',
        [Validators.maxLength(255), Validators.required],
      ],
      companies: this._fb.array([this.addCompainesGroup()]),
      companyDevelopmentFees: this._fb.array([
        this.addCompanyDevelopmentFeesGroup(),
      ]),
      websiteMaintenanceFees: this._fb.array([
        this.addWebsiteMaintenanceFeesGroup(),
      ]),
      websiteSupervisors: this._fb.array([this.addWebsiteSupervisorsGroup()]),
      websiteDomainNameFees: [null, [Validators.required]],
      serviceFollowUp: [null, Validators.required],
      serviceFollowUpDetails: [null, Validators.maxLength(255)],
      hasComplainFeature: [null, Validators.required],
      complainFeatureDetails: [null, Validators.maxLength(255)],
      hasCustomerSatisfactionFeature: [null, Validators.required],
      customerSatisfactionFeatureDetails: [null, Validators.maxLength(255)],
      developedUsingLatestStandard: [
        null,
        [Validators.maxLength(255), Validators.required],
      ],
      latestStandardDetails: [null, Validators.maxLength(255)],
      preferStandardDevelopmentInstruction: [null, Validators.required],
      suggestionsDetails: [null, Validators.maxLength(255)], // 19
      suggestionsToShare: [null, Validators.required],
      continuousUpdate: [null, Validators.required],
      continuousUpdateDetails: [null, Validators.maxLength(255)],
      hasSocialMediaAccounts: [null, Validators.required],
      socialMediaAccountsDetails: [null, Validators.maxLength(255)],
      hasCustomerAwareness: [null, Validators.required],
      customerAwarenessDetails: [null, Validators.maxLength(255)],
      securityProtocolsApplied: [null, Validators.required],
      howMaintenanceApplied: [
        null,
        [Validators.required, Validators.maxLength(255)],
      ],
      hasTrackingFeature: [null, Validators.required],
      trackingFeatureDetails: [null, Validators.maxLength(255)],
      sourceCodeObtained: [null, Validators.required],
      websiteProgrammingLanguage: [
        null,
        [Validators.required, Validators.maxLength(255)],
      ],
      hasWebsiteExtraFees: [null, Validators.required],
      websiteExtraFeesDetails: [null, Validators.maxLength(255)], // optional
    });
  }

  /**
   * Init files instances wrap
   */
  private initFilesInstancesWrap() {
    this.initSystemImages();
    this.initContractFiles();
    this.initComplainSugesionFiles();
    this.initSecurityProtocolsDocuments();
  }

  /**
   * Init Complain sugesion files instance
   */
  private initComplainSugesionFiles(): void {
    this.complainSugesionFiles = new FileUploadService(
      this.httpSubmiturveyService,
      this.notificationService,
      this.cdr
    );
    this.complainSugesionFiles.setfileType(FileType.complainsSugesionFiles);
  }

  /**
   * Init Contract files instance
   */
  private initContractFiles(): void {
    this.contractFiles = new FileUploadService(
      this.httpSubmiturveyService,
      this.notificationService,
      this.cdr
    );
    this.contractFiles.setfileType(FileType.contractFiles);
  }

  /**
   * Init security protocol documents instance
   */
  private initSecurityProtocolsDocuments(): void {
    this.securityProtocolsDocuments = new FileUploadService(
      this.httpSubmiturveyService,
      this.notificationService,
      this.cdr
    );
    this.securityProtocolsDocuments.setfileType(
      FileType.securityProtocolsDocuments
    );
  }
  /**
   * Init system images instance
   */
  private initSystemImages() {
    this.systemImages = new FileUploadService(
      this.httpSubmiturveyService,
      this.notificationService,
      this.cdr
    );
    this.systemImages.setfileType(FileType.systemImages);
  }

  private addCompainesGroup(): FormGroup {
    return this._fb.group({
      companyName: [null, [Validators.required, this.maxLengthArray(255)]],
      contractYear: [null, Validators.required],
      reasonForLeaving: [null, [Validators.required, this.maxLengthArray(255)]],
    });
  }
  /**
   * Create new Form Group for second add more question
   * @returns
   */
  private addCompanyDevelopmentFeesGroup(): FormGroup {
    return this._fb.group({
      companyName: [null, [Validators.required, this.maxLengthArray(255)]],
      year: [null, Validators.required],
      paymentAmount: [null, [Validators.required]],
    });
  }
  /**
   * Create new Form Group for Third add more question
   * @returns
   */
  private addWebsiteMaintenanceFeesGroup(): FormGroup {
    return this._fb.group({
      totalPaymentAmount: [null, Validators.required],
      paymentYear: [null, Validators.required],
    });
  }
  /**
   * Create new Form Group for Fourth add more question
   * @returns
   */
  private addWebsiteSupervisorsGroup(): FormGroup {
    return this._fb.group({
      numberOfSupervisors: [null, [Validators.required]],
      supervisorPosition: [null, [Validators.required]],
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  /**
   * First add more Question
   */
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  get companiesArray(): FormArray {
    return <FormArray>this.userForm.get('companies');
  }

  addCompany(): void {
    this.companiesArray.push(this.addCompainesGroup());
  }

  removeCompany(index: number): void {
    this.companiesArray.removeAt(index);
  }

  resetCompanyArray() {
    this.userForm.setControl(
      'companies',
      this._fb.array([this.addCompainesGroup()])
    );
  }

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  /**
   * Second add more Question
   */
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  get companyDevelopmentFeesArray(): FormArray {
    return <FormArray>this.userForm.get('companyDevelopmentFees');
  }

  addCompanyDevelopmentFees(): void {
    this.companyDevelopmentFeesArray.push(
      this.addCompanyDevelopmentFeesGroup()
    );
  }

  removeTotalPaymentsForWebsites(index: number): void {
    this.companyDevelopmentFeesArray.removeAt(index);
  }

  resetcompanyDevelopmentFeesArray() {
    this.userForm.setControl(
      'companyDevelopmentFees',
      this._fb.array([this.addCompanyDevelopmentFeesGroup()])
    );
  }

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  /**
   * Third add more Question
   */
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  get websiteMaintenanceFeesArray(): FormArray {
    return <FormArray>this.userForm.get('websiteMaintenanceFees');
  }

  addWebsiteMaintenanceFees(): void {
    this.websiteMaintenanceFeesArray.push(
      this.addWebsiteMaintenanceFeesGroup()
    );
  }

  removeTotalAmountOfMantaniance(index: number): void {
    this.websiteMaintenanceFeesArray.removeAt(index);
  }

  resetwebsiteMaintenanceFeesArray() {
    this.userForm.setControl(
      'websiteMaintenanceFees',
      this._fb.array([this.addWebsiteMaintenanceFeesGroup()])
    );
  }

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  /**
   * Fourth add more Question
   */
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  get websiteSupervisorsArray(): FormArray {
    return <FormArray>this.userForm.get('websiteSupervisors');
  }

  addWebsiteSupervisors(): void {
    this.websiteSupervisorsArray.push(this.addWebsiteSupervisorsGroup());
  }

  removeNumberOfPeopleSupportsWebsite(index: number): void {
    this.websiteSupervisorsArray.removeAt(index);
  }

  resetWebSiteSupervisorsArray() {
    this.userForm.setControl(
      'websiteSupervisors',
      this._fb.array([this.addWebsiteSupervisorsGroup()])
    );
  }
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  maxLengthArray = (min: number) => {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c && c.value && c.value.length <= min) return null;
      return { maxLength: true };
    };
  };

  isNumberInput = () => {
    return (c: AbstractControl): { [key: string]: any } => {
      console.log(!isNaN(+c.value));
      if (isNaN(+c.value)) return { notNumber: true };
      return null;
    };
  };

  resetFormArray() {
    this.resetCompanyArray();
    this.resetwebsiteMaintenanceFeesArray();
    this.resetcompanyDevelopmentFeesArray();
    this.resetWebSiteSupervisorsArray();
  }

  ngOnInit(): void {
    this.httpSubmiturveyService.getFormInitializeApi().subscribe();
  }

  /**
   * Submit Form
   * start submitted form
   * Check validation
   * Send the form body to the API
   * Run submittied form sucess
   * and call initialize API to get a new ID for the new form
   * Stop loader
   * Run change detection to update the UI
   * @returns void
   */
  onSubmit(): void {
    this.startSubmittingForm();

    if (this.isNotValidForm()) {
      this.scrollToError();
      this.loading = false;
      this.scrollToError();
      return;
    }

    this.httpSubmiturveyService
      .sendSurveyDataApi(this.getSurveyFormData())
      .pipe(
        switchMap((response) => {
          if (response.status === 201 || response.status === 200) {
            this.submittedFormSuccess();
          }
          return this.httpSubmiturveyService.getFormInitializeApi();
        }),
        finalize(() => this.stopLoader())
      )
      .subscribe(
        () => {
          this.router.navigate(['/survey', 'success']);
          this.cdr.detectChanges();
        },
        (err) => {
          this.loading = false;
          this.notificationService.showError(err.message || '');
          this.violations = err.error.violations;
          this.cdr.detectChanges();
        }
      );
  }



  /**
   *  Check some cases if one of them is unvalid so error message should be shown
   * @returns boolean
   */
  isNotValidForm(): boolean {
    if (this.userForm.invalid) {
      this.notificationService.showError(ToasterMessage.validationError);
      return true;
    }

    if (
      this.contractFiles.isStartUploading ||
      this.systemImages.isStartUploading ||
      this.securityProtocolsDocuments.isStartUploading
    ) {
      this.notificationService.showError(ToasterMessage.isStillUploadingFile);
      return true;
    }

    if (this.contractFiles.filesPreview.length === 0) {
      this.notificationService.showError(ToasterMessage.uploadFileError);
      return true;
    }

    return false;
  }

  /**
   * It should be called when submitted form is success
   */
  submittedFormSuccess(): void {
    this.notificationService.showSuccess(ToasterMessage.success);
    this.userForm.reset();
    this.resetFormArray();
    this.endSubmittingForm();
    this.systemImages.filesPreview = [];
    this.securityProtocolsDocuments.filesPreview = [];
    this.contractFiles.filesPreview = [];
    this.httpSubmiturveyService.clearLocalStorage();
  }

  /**
   * Starts when form is submitted
   */
  startSubmittingForm(): void {
    this.isSubmitted = true;
    this.loading = true;
  }

  /**
   * Stop loader
   * @returns boolean
   */
  stopLoader(): boolean {
    return (this.loading = false);
  }

  /**
   * End submitted form
   */
  endSubmittingForm(): void {
    this.isSubmitted = false;
    this.loading = false;
  }

  /**
   *  This function is responsible for generating the form body that will be send to the API
   * @returns body of the form
   */
  getSurveyFormData() {
    return {
      ...this.userForm.value,
      uuid: this.httpSubmiturveyService.getFormUUID(),
      formStatus: TFormStatus.completed,
    };
  }

  scrollTo(el: any): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
      el.blur(); // Trigger error messages
      el.focus();
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector(
      '.ng-invalid[formControlName]'
    );
    this.scrollTo(firstElementWithError);
  }
}
