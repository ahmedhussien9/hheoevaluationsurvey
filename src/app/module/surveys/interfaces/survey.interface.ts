export interface Company {
  companyName: string;
  contractYear: string;
  reasonForLeaving: string;
}

export interface CompanyDevelopmentFee {
  companyName: string;
  year: string;
  paymentAmount: number;
}

export interface WebsiteMaintenanceFee {
  totalPaymentAmount: number;
  paymentYear: string;
}

export interface WebsiteSupervisor {
  numberOfSupervisors: number;
  supervisorPosition: string;
}

export interface FormFile {
  id: number;
  name: string;
  type: string;
  fileType: string;
}

export interface ISurvey {
  id: number;
  organizationName: string;
  webSiteURL: string;
  companies: Company[];
  companyDevelopmentFees: CompanyDevelopmentFee[];
  websiteMaintenanceFees: WebsiteMaintenanceFee[];
  websiteSupervisors: WebsiteSupervisor[];
  websiteSoftwareCompany: string;
  websiteHostDetails: string;
  sourceCodeObtained: boolean;
  websiteProgrammingLanguage: string;
  hasWebsiteExtraFees: boolean;
  websiteExtraFeesDetails: string;
  websiteDomainNameFees: number;
  serviceFollowUp: string;
  serviceFollowUpDetails: string;
  hasComplainFeature: boolean;
  complainFeatureDetails: string;
  hasCustomerSatisfactionFeature: boolean;
  customerSatisfactionFeatureDetails: string;
  developedUsingLatestStandard: boolean;
  latestStandardDetails: string;
  preferStandardDevelopmentInstruction: boolean;
  suggestionsToShare: boolean;
  suggestionsDetails: string;
  continuousUpdate: boolean;
  hasSocialMediaAccounts: boolean;
  socialMediaAccountsDetails: string;
  customerAwarenessDetails: string;
  trackingFeatureDetails: string;
  continuousUpdateDetails: string;
  hasCustomerAwareness: boolean;
  securityProtocolsApplied: boolean;
  howMaintenanceApplied: string;
  hasTrackingFeature: boolean;
  date: Date;
  formFiles: FormFile[];
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface ISurveryListResponse {
  content: ISurvey[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort2;
  size: number;
  number: number;
  empty: boolean;
}
