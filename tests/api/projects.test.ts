import { AxiosError } from 'axios';
import { describe, expect, test } from 'vitest';

import { api, COOKIES } from '.';

let project = {
  name: 'BSUIR Studing Process',
  description: '',
  status: 'Active',
  id: '65cd22adc75c1ec63fc28d1e',
};

describe('FN-4 Добавление нового проекта', () => {
  test('Успешное добавление', async () => {
    try {
      const res = await api.post('projects', project, { headers: COOKIES.PM });

      project = res.data;

      expect(res.status).toBe(201);
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });

  test('Попытка добавления без авторизации', async () => {
    try {
      await api.post('projects', project);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка добавления без прав', async () => {
    try {
      await api.post('projects', project, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });

  test('Попытка добавления проекта, если проект с таким названием уже существует', async () => {
    try {
      await api.post('projects', project, { headers: COOKIES.PM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(409);
    }
  });
});

describe('FN-5 Редактирование информации о проекте', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.put('projects', { ...project, description: 'new description' }, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.put('projects', { ...project, description: 'new description' });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.put('projects', { ...project, description: 'new description' }, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });

  test('Попытка изменить название проекта на уже занятое в системе', async () => {
    try {
      await api.put('projects', { ...project, name: 'ALM' }, { headers: COOKIES.PM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(409);
    }
  });
});

describe('FN-6 Просмотр списка проектов', () => {
  test('Успешный запрос на получении информации о проектах', async () => {
    const res = await api.get('projects', { headers: COOKIES.RM });

    expect(res.status).toBe(200);
  });

  test('Попытка получения списка проектов без авторизации', async () => {
    try {
      await api.get('projects');
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });
});

describe('FN-7 Удаление проекта', () => {
  test('Успешное удаление проекта', async () => {
    const res = await api.delete(`projects/${project.id}`, { headers: COOKIES.PM });

    expect(res.status).toBe(200);
  });

  test('Попытка удаления без авторизации', async () => {
    try {
      await api.delete(`projects/${project.id}`);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка удаления без прав', async () => {
    try {
      await api.delete(`projects/${project.id}`, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});
