export const getCookie = (name: string) => {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);

  return match?.[2];
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
};
