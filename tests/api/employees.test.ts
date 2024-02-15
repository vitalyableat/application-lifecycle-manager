import { AxiosError } from 'axios';
import { describe, expect, test } from 'vitest';

import { api, COOKIES } from '.';

const employee = {
  name: 'Виталий',
  surname: 'Ольхов',
  birthDate: '2003-10-02',
  phone: '+375 29 000 0001',
  email: 'vitalyatest1@gmail.com',
  id: '65cbb8cd4121aef988575aae',
};

describe('FN-1 Добавление нового сотрудника', () => {
  test('Успешное добавление', async () => {
    try {
      const res = await api.post('employees', employee, { headers: COOKIES.RM });

      expect(res.status).toBe(201);
    } catch (e) {}
  });

  test('Попытка добавления без авторизации', async () => {
    try {
      await api.post('employees', employee);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка добавления без прав', async () => {
    try {
      await api.post('employees', employee, { headers: COOKIES.PM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });

  test('Попытка добавления сотрудника с уже зарегистрированной в системе почтой или номером телефона', async () => {
    try {
      await api.post('employees', employee, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(409);
    }
  });
});

describe('FN-2 Редактирование информации о сотруднике', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.put('employees', employee, { headers: COOKIES.RM });

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.put('employees', employee);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.put('employees', employee, { headers: COOKIES.PM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });

  test('Попытка установить занятый адрес электронной почты', async () => {
    try {
      await api.put('employees', { ...employee, email: 'vitalya@gmail.com' }, { headers: COOKIES.RM });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(409);
    }
  });
});

describe('FN-3 Просмотр списка сотрудников', () => {
  test('Успешный запрос на получении информации о сотрудниках', async () => {
    const res = await api.get('employees', { headers: COOKIES.DEV });

    expect(res.status).toBe(200);
  });

  test('Попытка получения списка сотрудников без авторизации', async () => {
    try {
      await api.put('employees', employee);
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });
});

describe('FN-19 Редактирование личной информации', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.put(
      `employees/${employee.id}`,
      { ...employee, name: 'Vitalya', surname: 'Tester' },
      { headers: COOKIES.DEV },
    );

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.put(`employees/${employee.id}`, { ...employee, name: 'Vitalya', surname: 'Tester' });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.put(
        `employees/${employee.id}`,
        { ...employee, name: 'Vitalya', surname: 'Tester' },
        { headers: COOKIES.PM },
      );
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });

  test('Попытка установить занятый адрес электронной почты', async () => {
    try {
      await api.put(`employees/${employee.id}`, { ...employee, email: 'vitalya@gmail.com' }, { headers: COOKIES.DEV });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(409);
    }
  });
});

describe('FN-21 Изменения пароля от аккаунта', () => {
  test('Успешное редактирование информации', async () => {
    const res = await api.patch(
      `employees/${employee.id}`,
      { oldPassword: '2222', newPassword: '1111' },
      { headers: COOKIES.DEV },
    );

    expect(res.status).toBe(200);
  });

  test('Попытка редактирования без авторизации', async () => {
    try {
      await api.patch(`employees/${employee.id}`, { oldPassword: '2222', newPassword: '1111' });
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(401);
    }
  });

  test('Попытка редактирования без прав', async () => {
    try {
      await api.patch(
        `employees/${employee.id}`,
        { oldPassword: '2222', newPassword: '1111' },
        { headers: COOKIES.PM },
      );
    } catch (e) {
      expect((e as AxiosError).request.res.statusCode).toBe(403);
    }
  });
});
