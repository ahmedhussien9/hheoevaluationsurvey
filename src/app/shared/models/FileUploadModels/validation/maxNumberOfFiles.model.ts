import { FilePreviw } from "src/app/module/survey-form/interfaces/IFilePreview.interface";

export default function checkMaxFileNumber(
  currentFiles: FilePreviw[],
  upCommingFiles: File[],
  maxNumber: number
) {
  return currentFiles.length + upCommingFiles.length > maxNumber;
}
