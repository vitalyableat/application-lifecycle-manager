import { dateToIsoString } from '@/utils/date-to-iso-string';

import { dateToString } from './date-to-string';

export const getDateArray = (startDate: Date): string[] => {
  const res = [];
  const finalDate = new Date(new Date().getTime() + 86400000);

  while (dateToIsoString(startDate) <= dateToIsoString(finalDate)) {
    res.push(dateToString(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return res;
};
