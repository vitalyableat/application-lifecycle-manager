interface IServerStatus {
  status: number;
  statusText?: string;
}

export const SERVER_STATUS: { [key: number]: IServerStatus } = {
  200: { status: 200 },
  201: { status: 201 },

  400: { status: 400, statusText: '400' },
  401: { status: 401, statusText: '401' },
  403: { status: 403, statusText: '403' },
  404: { status: 404, statusText: '404' },
  500: { status: 500, statusText: '500' },
};
