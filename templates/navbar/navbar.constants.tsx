import { ReactNode } from 'react';

import { CopyDocumentBulkIcon, EditDocumentBulkIcon } from '@nextui-org/shared-icons';

import { KanbanIcon, ReportIcon, TimelineIcon } from '@/icons';
import { IProject } from '@/models/project';

interface IProjectListboxItem {
  key: string;
  title: string;
  Icon: ReactNode;
}

export const PROJECT_LISTBOX: IProjectListboxItem[] = [
  { key: 'description', title: 'Description', Icon: <EditDocumentBulkIcon className="text-xl" /> },
  { key: 'user-stories', title: 'User Stories', Icon: <CopyDocumentBulkIcon className="text-xl" /> },
  { key: 'timeline', title: 'Timeline', Icon: <TimelineIcon /> },
  { key: 'kanban-board', title: 'Kanban Board', Icon: <KanbanIcon /> },
  { key: 'report', title: 'Report', Icon: <ReportIcon className="text-xl" /> },
];

export const MOCKED_PROJECTS: IProject[] = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Description',
    startDate: '2023.10.10',
    endDate: '',
    employeeIds: ['1', '2'],
  },
];
