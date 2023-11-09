import { Divider } from '@nextui-org/divider';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';

import { LogoIcon } from '@/components/icons';

import { UserPreview } from './components/user-preview';

export const AppBar = () => {
  return (
    <Navbar maxWidth="full" className="shadow">
      <NavbarBrand className="max-w-[159px]">
        <LogoIcon />
        <p className="font-bold text-xl">ALM</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="start">
        <Divider orientation="vertical" className="h-10 bg-default-200" />
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <UserPreview />
      </NavbarContent>
    </Navbar>
  );
};
