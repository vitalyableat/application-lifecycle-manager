import { ReactNode } from 'react';

import { CopyDocumentBulkIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';

import { KanbanIcon, ReportIcon, TimelineIcon } from '@/components/icons';
import { APP_ROUTE } from '@/constants/app-route';

type ProjectItemTitle = 'details' | 'features' | 'timeline' | 'kanban' | 'report';

interface IProjectListboxItem {
  key: APP_ROUTE;
  title: ProjectItemTitle;
  Icon: ReactNode;
}

export const PROJECT_LISTBOX: IProjectListboxItem[] = [
  { key: APP_ROUTE.PROJECT_DETAILS, title: 'details', Icon: <EditDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTE.PROJECT_FEATURES, title: 'features', Icon: <CopyDocumentBulkIcon className="text-xl" /> },
  { key: APP_ROUTE.PROJECT_TIMELINE, title: 'timeline', Icon: <TimelineIcon /> },
  { key: APP_ROUTE.PROJECT_KANBAN_BOARD, title: 'kanban', Icon: <KanbanIcon /> },
  { key: APP_ROUTE.PROJECT_REPORT, title: 'report', Icon: <ReportIcon className="text-xl" /> },
];
