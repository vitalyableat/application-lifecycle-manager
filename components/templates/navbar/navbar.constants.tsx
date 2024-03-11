import { FC } from 'react';

import { IconSvgProps } from '@nextui-org/shared-icons/dist/types';

import { EmployeesIcon, LogoutIcon, ProfileIcon, ProjectsIcon } from '@/components/icons';
import { APP_ROUTE } from '@/constants/app-route';

type NavbarItemTitle = 'projects' | 'employees' | 'profile' | 'logout';

interface INavbarListboxItem {
  key: APP_ROUTE;
  title: NavbarItemTitle;
  Icon: FC<IconSvgProps>;
}

export const NAVBAR_LISTBOX: INavbarListboxItem[] = [
  { key: APP_ROUTE.PROJECTS, title: 'projects', Icon: ProjectsIcon },
  { key: APP_ROUTE.EMPLOYEES, title: 'employees', Icon: EmployeesIcon },
  { key: APP_ROUTE.PROFILE, title: 'profile', Icon: ProfileIcon },
  { key: APP_ROUTE.LOGIN, title: 'logout', Icon: LogoutIcon },
];
