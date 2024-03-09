import { AxiosError } from 'axios';
import { describe, expect, test } from 'vitest';

import { api, COOKIES } from '.';

let task = {
  featureId: '656f727a89400cc9171465cd',
  projectId: '656e46403b37cc49d9f29070',
  title: 'Test Functional Requirements',
  status: 'On Hold',
  id: '65be52022ce9ffa8709dcf22',
};

describe('FN-12 Добавление новой задачи', () => {
  test('Успешное добавление', async () => {
    try {
      const res = await api.post('tasks', task, { headers: COOKIES.PM });

      task = res.data;

      expect(res.status).toBe(201);
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });

  test('Попытка добавления без авторизации', async () => {
    try {
      await api.post('tasks', task);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка добавления без прав', async () => {
    try {
      await api.post('tasks', task, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});

describe('FN-13 Редактирование информации о задаче', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.put('tasks', { ...task, description: 'new description' }, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.put('tasks', { ...task, description: 'new description' });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.put('tasks', { ...task, description: 'new description' }, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});

describe('FN-14 Просмотр списка задач', () => {
  test('Успешный запрос на получении информации о задачах', async () => {
    const res = await api.get(`tasks/${task.projectId}`, { headers: COOKIES.RM });

    expect(res.status).toBe(200);
  });

  test('Попытка получения списка задач без авторизации', async () => {
    try {
      await api.get(`tasks/${task.projectId}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });
});

describe('FN-15 Удаление задачи', () => {
  test('Успешное удаление задачи', async () => {
    const res = await api.delete(`tasks/${task.id}`, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка удаления без авторизации', async () => {
    try {
      await api.delete(`tasks/${task.id}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка удаления без прав', async () => {
    try {
      await api.delete(`tasks/${task.id}`, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});
