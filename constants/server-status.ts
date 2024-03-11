import { getDictionary } from '@/dictionaries';

interface IServerStatus {
  status: number;
  statusText?: string;
}

export const getServerStatus: (d: ReturnType<typeof getDictionary>) => { [key: number]: IServerStatus } = (
  d: ReturnType<typeof getDictionary>,
) => ({
  200: { status: 200 },
  201: { status: 201 },

  400: { status: 400, statusText: d.server[400] },
  401: { status: 401, statusText: d.server[401] },
  403: { status: 403, statusText: d.server[403] },
  404: { status: 404, statusText: d.server[404] },
  500: { status: 500, statusText: d.server[500] },
});
