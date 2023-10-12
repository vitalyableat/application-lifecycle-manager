'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  User,
} from '@nextui-org/react';

import { LogoIcon } from '@/icons';

export const AppBar = () => {
  return (
    <Navbar maxWidth="full" className="shadow">
      <NavbarBrand>
        <LogoIcon />
        <p className="font-bold text-xl">ALM</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              name="Jane Doe"
              as="button"
              avatarProps={{
                src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
              }}
            />
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
