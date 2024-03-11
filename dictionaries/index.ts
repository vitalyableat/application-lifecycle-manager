import { COOKIE_NAME } from '@/constants/cookie-name';
import { getCookie } from '@/utils/cookie';

import * as enDictionary from './en.json';
import * as ruDictionary from './ru.json';

export enum ELocale {
  en = 'en',
  ru = 'ru',
}

const DICTIONARIES = {
  en: enDictionary,
  ru: ruDictionary,
};

export const getDictionary = (locale?: string) =>
  locale && locale in ELocale ? DICTIONARIES[locale as ELocale] : DICTIONARIES.en;

export const getClientLocale = () => getCookie(COOKIE_NAME.LOCALE);

export const getServerLocale = async () => {
  const { cookies } = await import('next/headers');

  return cookies().get(COOKIE_NAME.LOCALE)?.value;
};
