'use client';
import { ChangeEvent, FC } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { COOKIE_NAME } from '@/constants/cookie-name';
import { ELocale, getClientLocale, getDictionary } from '@/dictionaries';
import { setCookie } from '@/utils/cookie';

export const LanguageSelect: FC = () => {
  const locale = getClientLocale();
  const d = getDictionary(locale);
  const language = locale && locale in ELocale ? locale : ELocale.en;

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCookie(COOKIE_NAME.LOCALE, e.target.value);
    location.reload();
  };

  return (
    <Select
      label={d.labels.language}
      selectedKeys={[language]}
      onChange={onLanguageChange}
      variant="bordered"
      size="sm"
      className="max-w-xs">
      {Object.values(ELocale).map((locale) => (
        <SelectItem key={locale} value={locale} color="secondary" textValue={d.templates.appBar[locale]}>
          {d.templates.appBar[locale]}
        </SelectItem>
      ))}
    </Select>
  );
};
