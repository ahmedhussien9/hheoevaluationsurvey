import { DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
    private toastr: ToastrService
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
      customerSatisfactionFeature: [null],
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
      CustomerAwarenessDetails: [null],
      securityProtocolsApplied: [null, Validators.required],
      howMaintenanceApplied: [null, Validators.required],
      hasTrackingFeature: [null, Validators.required],
      trackingFeatureDetails: [null],
      sourceCodeObtained: [null, Validators.required],
      websiteProgrammingLanguage: [null, Validators.required],
      haswebsiteextrafees: [null, Validators.required],
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
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    if (!this.httpSubmiturveyService.getFormIdFromLocalStorage()) {
      this.httpSubmiturveyService.getFormInitializeApi().subscribe();
    }
  }

  isNotValidForm(): boolean {
    if (this.userForm.invalid) {
      this.toastr.error(ToasterMessage.validationError);
      return true;
    }
    if (this.contractFilesService.filesPreview.length === 0) {
      this.toastr.error(ToasterMessage.uploadFileError);
      return true;
    }
    return false;
  }

  submit() {
    this.isSubmitted = true;
    this.loading = true;

    if (this.isNotValidForm()) {
      this.loading = false;
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
        finalize(() => (this.loading = false))
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  submittedFormSuccess() {
    this.toastr.success(ToasterMessage.success);
    this.userForm.reset();
    this.isSubmitted = false;
    this.loading = false;
    this.httpSubmiturveyService.clearLocalStorage();
  }

  getSurveyFormData() {
    return {
      ...this.userForm.value,
      uuid: this.httpSubmiturveyService.getFormUUID(),
      formStatus: TFormStatus.completed,
    };
  }
}
