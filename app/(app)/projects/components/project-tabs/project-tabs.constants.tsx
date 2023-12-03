import { ReactNode } from 'react';

import { CopyDocumentBulkIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';

import { KanbanIcon, ReportIcon, TimelineIcon } from '@/components/icons';
import { APP_ROUTE } from '@/constants/app-route';

interface IProjectListboxItem {
  key: APP_ROUTE;
  title: string;
  Icon: ReactNode;
}

export const PROJECT_LISTBOX: IProjectListboxItem[] = [
  { key: APP_ROUTE.PROJECT_DETAILS, title: 'Details', Icon: <EditDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTE.PROJECT_FEATURES, title: 'Features', Icon: <CopyDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTE.PROJECT_TIMELINE, title: 'Timeline', Icon: <TimelineIcon /> },
  { key: APP_ROUTE.PROJECT_KANBAN_BOARD, title: 'Kanban Board', Icon: <KanbanIcon /> },
  { key: APP_ROUTE.PROJECT_REPORT, title: 'Report', Icon: <ReportIcon className="text-xl" /> },
];
