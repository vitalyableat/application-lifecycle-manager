export enum APP_ROUTE {
  HOME = '/',

  LOGIN = '/login',

  PROFILE = '/profile',
  PROFILE_EDIT = '/profile/edit',

  EMPLOYEES = '/employees',
  EMPLOYEE_DETAILS = '/employees/:employeeId',
  EMPLOYEE_DETAILS_EDIT = '/employees/:employeeId/edit',
  EMPLOYEE_CREATE = '/employees/create',

  PROJECTS = '/projects',
  PROJECT_CREATE = '/projects/create',
  PROJECT_DETAILS = '/projects/:projectId/details',
  PROJECT_DETAILS_EDIT = '/projects/:projectId/details/edit',
  PROJECT_FEATURES = '/projects/:projectId/features',
  PROJECT_TIMELINE = '/projects/:projectId/timeline',
  PROJECT_KANBAN_BOARD = '/projects/:projectId/kanban-board',
  PROJECT_REPORT = '/projects/:projectId/report',
}
