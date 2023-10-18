import { FC } from 'react';

import { IconSvgProps } from '@nextui-org/shared-icons/dist/types';

import { APP_ROUTES } from '@/constants/app-routes';
import { LogoutIcon, ProfileIcon, ProjectsIcon, SettingsIcon, UsersIcon } from '@/icons';

interface IProjectListboxItem {
  key: APP_ROUTES;
  title: string;
  Icon: FC<IconSvgProps>;
}

export const NAVBAR_LISTBOX: IProjectListboxItem[] = [
  { key: APP_ROUTES.PROJECTS, title: 'Projects', Icon: ProjectsIcon },
  { key: APP_ROUTES.USERS, title: 'Users', Icon: UsersIcon },
  { key: APP_ROUTES.PROFILE, title: 'Profile', Icon: ProfileIcon },
  { key: APP_ROUTES.SETTINGS, title: 'Settings', Icon: SettingsIcon },
  { key: APP_ROUTES.LOGIN, title: 'Logout', Icon: LogoutIcon },
];
