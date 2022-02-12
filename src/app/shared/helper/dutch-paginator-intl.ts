import { MatPaginatorIntl } from '@angular/material/paginator';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `${(0).toLocaleString('ar-EG')} من ${length.toLocaleString(
      'ar-EG'
    )}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${(startIndex + 1).toLocaleString(
    'ar-EG'
  )}  - ${endIndex.toLocaleString('ar-EG')} من ${length.toLocaleString(
    'ar-EG'
  )}`;
};

export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'نماذج لكل صفحة:';
  paginatorIntl.nextPageLabel = 'الصفحة التالية';
  paginatorIntl.previousPageLabel = 'الصفحة السابقة';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
