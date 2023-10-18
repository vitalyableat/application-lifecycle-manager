import { ReactNode } from 'react';

import { CopyDocumentBulkIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';

import { APP_ROUTES } from '@/constants/app-routes';
import { KanbanIcon, ReportIcon, TimelineIcon } from '@/icons';
import { IProject } from '@/models/project';

interface IProjectListboxItem {
  key: APP_ROUTES;
  title: string;
  Icon: ReactNode;
}

export const PROJECT_LISTBOX: IProjectListboxItem[] = [
  { key: APP_ROUTES.PROJECT_DETAILS, title: 'Details', Icon: <EditDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTES.PROJECT_USER_STORIES, title: 'User Stories', Icon: <CopyDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTES.PROJECT_TIMELINE, title: 'Timeline', Icon: <TimelineIcon /> },
  { key: APP_ROUTES.PROJECT_KANBAN_BOARD, title: 'Kanban Board', Icon: <KanbanIcon /> },
  { key: APP_ROUTES.PROJECT_REPORT, title: 'Report', Icon: <ReportIcon className="text-xl" /> },
];

export const MOCKED_PROJECTS: IProject[] = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '3',
    name: 'Project 3',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '4',
    name: 'Project 4',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '5',
    name: 'Project 5',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '6',
    name: 'Project 6',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '7',
    name: 'Project 7',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '8',
    name: 'Project 8',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '9',
    name: 'Project 9',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
  {
    id: '10',
    name: 'Project 10',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
    status: 'Active',
  },
];
