import { Divider } from '@nextui-org/divider';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import { User } from '@nextui-org/user';

import { LogoIcon } from '@/components/icons';

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
        <User
          name="Jane Doe"
          description="React Developer"
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
          }}
        />
      </NavbarContent>
    </Navbar>
  );
};
