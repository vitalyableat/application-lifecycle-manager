import { Divider } from '@nextui-org/divider';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';

import { LogoIcon } from '@/components/icons';
import { getDictionary, getServerLocale } from '@/dictionaries';

import { LanguageSelect, UserPreview } from './components';

export const AppBar = async () => {
  const d = getDictionary(await getServerLocale());

  return (
    <Navbar maxWidth="full" className="shadow">
      <NavbarBrand className="max-w-[159px]">
        <a className="cursor-pointer flex items-center" href="/">
          <LogoIcon />
          <p className="font-bold text-xl">{d.alm}</p>
        </a>
      </NavbarBrand>
      <Divider orientation="vertical" className="h-10 bg-default-200" />
      <NavbarContent as="div" justify="end">
        <LanguageSelect />
        <UserPreview />
      </NavbarContent>
    </Navbar>
  );
};
