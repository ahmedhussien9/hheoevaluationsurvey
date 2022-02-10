import { DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap, tap } from 'rxjs';

import { SecurityProtocolsDocumentsService } from 'src/app/module/survey-form/services/SecurityProtocolsDocuments.service';
import { SystemImagesService } from 'src/app/module/survey-form/services/SystemImages.service';
import { HttpSubmitSurveyService } from './services/http-survey.service';
import { ContractFilesService } from 'src/app/module/survey-form/services/ContractFiles.service';
import { TFormStatus } from 'src/app/module/surveys/types/TFormStatus.type';

enum ToasterMessage {
  success = 'تم ارسال النموذج  بنجاح شكرا لكم',
  validationError = 'من فضلك قم بملئ النموذج!',
  uploadFileError = 'من فضلك قم برفع الملفات المطلوبة',
  isStillUploadingFile = 'برجاء انتظار تحميل الملفات',
}

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    ContractFilesService,
    SystemImagesService,
    SecurityProtocolsDocumentsService,
    HttpSubmitSurveyService,
  ],
})
export class SurveyFormComponent implements OnInit, AfterContentChecked {
  public userForm: FormGroup;
  firstSampleFiles: File[] = [];
  isSubmitted = false;
  loading = false;

  constructor(
    private _fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public contractFilesService: ContractFilesService,
    public systemImagesService: SystemImagesService,
    public securityProtocolsDocumentsService: SecurityProtocolsDocumentsService,
    private httpSubmiturveyService: HttpSubmitSurveyService,
    private toastr: ToastrService,
    private el: ElementRef
  ) {
    this.userForm = this._fb.group({
      organizationName: ['', [Validators.minLength(3), Validators.required]],
      webSiteURL: ['', [Validators.minLength(3), Validators.required]],
      websiteSoftwareCompany: [
        '',
        [Validators.minLength(3), Validators.required],
      ],
      websiteHostDetails: ['', [Validators.minLength(3), Validators.required]],
      companies: this._fb.array([this.addCompainesGroup()]),
      companyDevelopmentFees: this._fb.array([
        this.addCompanyDevelopmentFeesGroup(),
      ]),
      websiteMaintenanceFees: this._fb.array([
        this.addWebsiteMaintenanceFeesGroup(),
      ]),
      websiteSupervisors: this._fb.array([this.addWebsiteSupervisorsGroup()]),
      websiteDomainNameFees: [null, Validators.required],
      serviceFollowUp: [null, Validators.required],
      serviceFollowUpDetails: [null],
      hasComplainFeature: [null, Validators.required],
      complainFeatureDetails: [null],
      hasCustomerSatisfactionFeature: [null, Validators.required],
      customerSatisfactionFeatureDetails: [null],
      developedUsingLatestStandard: [null, Validators.required],
      latestStandardDetails: [null],
      preferStandardDevelopmentInstruction: [null, Validators.required],
      suggestionsDetails: [null], // 19
      suggestionsToShare: [null, Validators.required],
      continuousUpdate: [null, Validators.required],
      continuousUpdateDetails: [null],
      hasSocialMediaAccounts: [null, Validators.required],
      socialMediaAccountsDetails: [null],
      hasCustomerAwareness: [null, Validators.required],
      customerAwarenessDetails: [null],
      securityProtocolsApplied: [null, Validators.required],
      howMaintenanceApplied: [null, Validators.required],
      hasTrackingFeature: [null, Validators.required],
      trackingFeatureDetails: [null],
      sourceCodeObtained: [null, Validators.required],
      websiteProgrammingLanguage: [null, Validators.required],
      hasWebsiteExtraFees: [null, Validators.required],
      websiteExtraFeesDetails: [null], // optional
    });
  }

  private addCompainesGroup(): FormGroup {
    return this._fb.group({
      companyName: [null, Validators.required],
      contractYear: [null, Validators.required],
      reasonForLeaving: [null, Validators.required],
    });
  }
  /**
   * Create new Form Group for second add more question
   * @returns
   */
  private addCompanyDevelopmentFeesGroup(): FormGroup {
    return this._fb.group({
      companyName: [null, Validators.required],
      year: [null, Validators.required],
      paymentAmount: [null, Validators.required],
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
      numberOfSupervisors: [null, Validators.required],
      supervisorPosition: [null, Validators.required],
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
      .subscribe(() => this.cdr.detectChanges());
  }

  /**
   *  Check some cases if one of them is unvalid so error message should be shown
   * @returns boolean
   */
  isNotValidForm(): boolean {
    if (this.userForm.invalid) {
      this.toastr.error(ToasterMessage.validationError);
      return true;
    }

    if (
      this.contractFilesService.isStartUploading ||
      this.systemImagesService.isStartUploading ||
      this.securityProtocolsDocumentsService.isStartUploading
    ) {
      this.toastr.error(ToasterMessage.isStillUploadingFile);
      return true;
    }

    if (this.contractFilesService.filesPreview.length === 0) {
      this.toastr.error(ToasterMessage.uploadFileError);
      return true;
    }

    return false;
  }

  /**
   * It should be called when submitted form is success
   */
  submittedFormSuccess(): void {
    this.toastr.success(ToasterMessage.success);
    this.userForm.reset();
    this.resetFormArray();
    this.endSubmittingForm();
    this.systemImagesService.filesPreview = [];
    this.securityProtocolsDocumentsService.filesPreview = [];
    this.contractFilesService.filesPreview = [];
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
