interface IServerStatus {
  status: number;
  statusText?: string;
}

export const SERVER_STATUS: { [key: number]: IServerStatus } = {
  200: { status: 200 },
  201: { status: 201 },

  400: { status: 400, statusText: 'Bad request' },
  401: { status: 401, statusText: 'Unauthorized' },
  403: { status: 403, statusText: 'You have no access to this resource' },
  404: { status: 404, statusText: 'Not found' },
  500: { status: 500, statusText: 'Something went wrong, please try again later' },
};
