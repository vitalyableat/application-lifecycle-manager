export const numericCollationSort = (a: string, b: string): number => {
  const aNum = a.split(' ')[0].match(/\d+/)?.[0];
  const bNum = b.split(' ')[0].match(/\d+/)?.[0];

  if (aNum && bNum && a.split(aNum)[0] === b.split(bNum)[0]) {
    return +aNum < +bNum ? -1 : 1;
  }

  return a < b ? -1 : 1;
};
