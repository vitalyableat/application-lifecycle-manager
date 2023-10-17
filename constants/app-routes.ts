export enum APP_ROUTES {
  HOME = '/',

  LOGIN = '/login',

  PROFILE = '/profile', // user
  PROFILE_EDIT = '/profile/edit', // user
  SETTINGS = '/settings', // user

  USERS = '/users',
  USER_DETAILS = '/users/:userId',
  USER_DETAILS_EDIT = '/users/:userId/edit', // RM
  USERS_CREATE = '/users/create', // RM

  PROJECTS = '/projects',
  PROJECTS_CREATE = '/projects/create', // PM
  PROJECTS_REQUESTS = '/projects/requests', // RM
  PROJECT_DETAILS = '/projects/:projectId/details',
  PROJECT_DETAILS_EDIT = '/projects/:projectId/details/edit', // PM
  PROJECT_USER_STORIES = '/projects/:projectId/user-stories', // CRUD - PM
  PROJECT_TIMELINE = '/projects/:projectId/timeline', // CRUD - PM, Tasks - Collaborators
  PROJECT_KANBAN_BOARD = '/projects/:projectId/kanban-board',
  PROJECT_REPORT = '/projects/:projectId/report', // Save report as PDF - PM
}
