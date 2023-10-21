import { ReactNode } from 'react';

import { CopyDocumentBulkIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';
import { Types } from 'mongoose';

import { APP_ROUTES } from '@/constants/app-routes';
import { KanbanIcon, ReportIcon, TimelineIcon } from '@/icons';
import { IProject, PROJECT_STATUS } from '@/models/project';

interface IProjectListboxItem {
  key: APP_ROUTES;
  title: string;
  Icon: ReactNode;
}

export const PROJECT_LISTBOX: IProjectListboxItem[] = [
  { key: APP_ROUTES.PROJECT_DETAILS, title: 'Details', Icon: <EditDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTES.PROJECT_FEATURES, title: 'Features', Icon: <CopyDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTES.PROJECT_TIMELINE, title: 'Timeline', Icon: <TimelineIcon /> },
  { key: APP_ROUTES.PROJECT_KANBAN_BOARD, title: 'Kanban Board', Icon: <KanbanIcon /> },
  { key: APP_ROUTES.PROJECT_REPORT, title: 'Report', Icon: <ReportIcon className="text-xl" /> },
];

export const MOCKED_PROJECTS: IProject[] = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description',
    startDate: new Date(),
    employeeIds: [],
    status: PROJECT_STATUS.ACTIVE,
  },
];
