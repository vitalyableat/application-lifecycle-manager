import { AxiosError } from 'axios';
import { describe, expect, test } from 'vitest';

import { api, COOKIES } from '.';

let feature = {
  projectId: '656e46403b37cc49d9f29070',
  title: 'B-2 User Registration',
  description: '',
  id: '65be4d5f2ce9ffa8709dcf10',
};

describe('FN-8 Добавление нового функционального требования', () => {
  test('Успешное добавление', async () => {
    try {
      const res = await api.post('features', feature, { headers: COOKIES.PM });

      feature = res.data;

      expect(res.status).toBe(201);
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });

  test('Попытка добавления без авторизации', async () => {
    try {
      await api.post('features', feature);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка добавления без прав', async () => {
    try {
      await api.post('features', feature, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});

describe('FN-9 Редактирование информации о функциональном требовании', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.put('features', { ...feature, description: 'new description' }, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.put('features', { ...feature, description: 'new description' });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.put('features', { ...feature, description: 'new description' }, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});

describe('FN-10 Просмотр списка функциональных требований к проекту', () => {
  test('Успешный запрос на получении информации о проектах', async () => {
    const res = await api.get(`features/${feature.projectId}`, { headers: COOKIES.RM });

    expect(res.status).toBe(200);
  });

  test('Попытка получения списка функциональных требований без авторизации', async () => {
    try {
      await api.get(`features/${feature.projectId}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });
});

describe('FN-11 Удаление функционального требования', () => {
  test('Успешное удаление функционального требования', async () => {
    const res = await api.delete(`features/${feature.id}`, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка удаления без авторизации', async () => {
    try {
      await api.delete(`features/${feature.id}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка удаления без прав', async () => {
    try {
      await api.delete(`features/${feature.id}`, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});
