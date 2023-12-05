export const getDateArray = (startDate: Date): string[] => {
  const res = [];
  const finalDate = new Date(new Date().getTime() + 86400000);

  while (startDate.toISOString().split('T')[0] <= finalDate.toISOString().split('T')[0] + 1) {
    res.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }

  return res;
};
