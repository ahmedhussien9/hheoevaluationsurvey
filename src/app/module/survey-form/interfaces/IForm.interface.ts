export interface IForm {
  organizationName: string;
  webSiteUrl: string;
  companyName: string;
  companiesNames: ICompany[];

}

export interface ICompany {
  name: string;
  contractDate: string;
  leaveNote: string;
}
