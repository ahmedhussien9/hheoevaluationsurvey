export class BuildFormDataModel {
  public formData = new FormData();
  private readonly FORM_LOCALSTORAGE_PRFIX = 'FORM_ID';

  constructor(public files: File[], public fileType: string) {
    this.generateFormData();
  }

  private generateFormData(): void {
    this.formData.append('formId', this.getFormId());
    this.formData.append('type', this.fileType);
    for (const file of this.files) {
      console.log('file', file);
      this.formData.append('file', file);
    }
  }

  getFormId(): string {
    return (
      JSON.parse(
        localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
      ).id.toString() || null
    );
  }

  get uploadFormData() {
    return this.formData;
  }
}
