export const formatPhone = (phone: string): string => {
  phone = phone.replace(/[^0-9]/g, '');
  phone = (phone.length < 11 ? '+375' : '+') + phone;

  return phone
    .split('')
    .map((l, i) => ([3, 5, 8].includes(i) ? l + ' ' : l))
    .join('');
};
