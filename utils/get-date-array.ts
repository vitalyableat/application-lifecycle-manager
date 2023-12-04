export const getDateArray = (startDate: Date): string[] => {
  const res = [];

  while (startDate < new Date()) {
    res.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }

  return res;
};
