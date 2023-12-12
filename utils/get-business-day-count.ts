import { dateToIsoString } from '@/utils/date-to-iso-string';

const HOLIDAYS = [
  '2023-01-01',
  '2023-01-02',
  '2023-01-07',
  '2023-03-08',
  '2023-04-25',
  '2023-05-01',
  '2023-05-09',
  '2023-07-03',
  '2023-11-07',
  '2023-12-25',
];

export const getBusinessDayCount = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const curDate = new Date(startDate.getTime());

  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !HOLIDAYS.includes(dateToIsoString(curDate))) {
      count++;
    }
    curDate.setDate(curDate.getDate() + 1);
  }

  return count;
};
