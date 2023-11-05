'use client';

import { useEffect } from 'react';

import { getUser } from '@/services/employees/api';

const HomePage = () => {
  useEffect(() => {
    getUser();
  }, []);

  return <main>Application Lifecycle Manager</main>;
};

export default HomePage;
