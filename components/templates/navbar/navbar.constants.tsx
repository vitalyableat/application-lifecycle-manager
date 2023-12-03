import { FC } from 'react';

import { IconSvgProps } from '@nextui-org/shared-icons/dist/types';

import { EmployeesIcon, LogoutIcon, ProfileIcon, ProjectsIcon } from '@/components/icons';
import { APP_ROUTE } from '@/constants/app-route';

interface IProjectListboxItem {
  key: APP_ROUTE;
  title: string;
  Icon: FC<IconSvgProps>;
}

export const NAVBAR_LISTBOX: IProjectListboxItem[] = [
  { key: APP_ROUTE.PROJECTS, title: 'Projects', Icon: ProjectsIcon },
  { key: APP_ROUTE.EMPLOYEES, title: 'Employees', Icon: EmployeesIcon },
  { key: APP_ROUTE.PROFILE, title: 'Profile', Icon: ProfileIcon },
  { key: APP_ROUTE.LOGIN, title: 'Logout', Icon: LogoutIcon },
];
