import { FilePreviw } from 'src/app/module/survey-form/interfaces/IFilePreview.interface';

export default function CheckMaxFilesSizeValidation(
  currentFiles: FilePreviw[],
  upCommingFiles: File[],
  max_size: number
) {
  let totalFilesSize = 0;

  for (let index = 0; index < upCommingFiles.length; index++) {
    const element = upCommingFiles[index];
    totalFilesSize += Math.round(element.size / 1024);
  }

  for (let index = 0; index < currentFiles.length; index++) {
    const element = currentFiles[index];
    totalFilesSize += element.size;
  }
  console.log('Check max size function', totalFilesSize >= max_size);
  console.log('Check max size function', totalFilesSize, max_size);
  return upCommingFiles.length > 0 && totalFilesSize >= max_size;
}
