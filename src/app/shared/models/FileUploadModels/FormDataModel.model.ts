import { FileType } from './File.types';

export class FormDataModel {
  public formData = new FormData();
  constructor(
    public surveyFormData: any,
    public contractFiles: File[],
    public systemImagesFile: File[],
    public securityProtocolsDocuments: File[]
  ) {
    this.setSurveData();
    this.setContractFiles();
    this.setSystemImages();
    this.setSecurityProtocolsDocuments();
  }
  private setSurveData(): void {
    this.formData.append('form', JSON.stringify(this.surveyFormData));
  }

  private setContractFiles(): void {
    for (const file of this.contractFiles) {
      this.formData.append(FileType.contractFiles, file);
    }
  }

  private setSystemImages(): void {
    for (const file of this.systemImagesFile) {
      this.formData.append(FileType.systemImages, file);
    }
  }

  private setSecurityProtocolsDocuments(): void {
    for (const file of this.securityProtocolsDocuments) {
      this.formData.append(FileType.securityProtocolsDocuments, file);
    }
  }

  get formSurveyData() {
    return this.formData;
  }
}
