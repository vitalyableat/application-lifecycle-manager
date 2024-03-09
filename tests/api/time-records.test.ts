import { AxiosError } from 'axios';
import { describe, expect, test } from 'vitest';

import { api, COOKIES } from '.';

let timeRecord = {
  hoursSpent: '4',
  date: '2024-02-15',
  time: '10:00',
  taskId: '65cd2c5cc75c1ec63fc28f7a',
  featureId: '656f727a89400cc9171465cd',
  projectId: '656e46403b37cc49d9f29070',
  employeeId: '65cbb8cd4121aef988575aae',
  id: '65cd3073c75c1ec63fc2906a',
};

describe('FN-16 Добавление новой записи о затраченном времени', () => {
  test('Успешное добавление', async () => {
    try {
      const res = await api.post('time-records', timeRecord, { headers: COOKIES.DEV });

      timeRecord = res.data;

      expect(res.status).toBe(201);
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });

  test('Попытка добавления без авторизации', async () => {
    try {
      await api.post('time-records', timeRecord);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка добавления без прав', async () => {
    try {
      await api.post('time-records', timeRecord, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});

describe('FN-17 Редактирование информации записи о затраченном времени', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.put('time-records', { ...timeRecord, time: '11:00' }, { headers: COOKIES.DEV });

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.put('time-records', { ...timeRecord, time: '11:00' });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.put('time-records', { ...timeRecord, time: '11:00' }, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});

describe('FN-22 Просмотр временной шкалы с ходом выполнения задач на проекте', () => {
  test('Успешный запрос на получении информации записей о затраченном времени', async () => {
    const res = await api.get(`time-records/${timeRecord.projectId}`, { headers: COOKIES.RM });

    expect(res.status).toBe(200);
  });

  test('Попытка получения списка записей о затраченном времени без авторизации', async () => {
    try {
      await api.get(`time-records/${timeRecord.projectId}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });
});

describe('FN-18 Удаление записи о затраченном времени', () => {
  test('Успешное удаление записи о затраченном времени', async () => {
    const res = await api.delete(`time-records/${timeRecord.id}`, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка удаления без авторизации', async () => {
    try {
      await api.delete(`time-records/${timeRecord.id}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка удаления без прав', async () => {
    try {
      await api.delete(`time-records/${timeRecord.id}`, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});
