export enum APP_ROUTE {
  HOME = '/',

  LOGIN = '/login',

  PROFILE = '/profile', // user
  PROFILE_EDIT = '/profile/edit', // user
  SETTINGS = '/settings', // user

  USERS = '/users',
  USER_DETAILS = '/users/:userId',
  USER_DETAILS_EDIT = '/users/:userId/edit', // RM
  USER_CREATE = '/users/create', // RM

  PROJECTS = '/projects',
  PROJECT_CREATE = '/projects/create', // PM
  PROJECT_REQUESTS = '/projects/requests', // RM
  PROJECT_DETAILS = '/projects/:projectId/details',
  PROJECT_DETAILS_EDIT = '/projects/:projectId/details/edit', // PM
  PROJECT_FEATURES = '/projects/:projectId/features', // CRUD - PM
  PROJECT_TIMELINE = '/projects/:projectId/timeline', // CRUD - PM, Tasks - Collaborators
  PROJECT_KANBAN_BOARD = '/projects/:projectId/kanban-board',
  PROJECT_REPORT = '/projects/:projectId/report', // Save report as PDF - PM
}
