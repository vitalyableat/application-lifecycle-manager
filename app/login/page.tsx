import { LogoIcon } from '@/components/icons';

import { LoginForm } from './components/login-form';

const LoginPage = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="bg-secondary-200 min-w-fit w-2/5 h-full flex flex-col items-center justify-center p-5">
        <div className="flex items-center">
          <LogoIcon height="128" width="128" />
          <p className="text-7xl font-bold">ALM</p>
        </div>
        <p className="text-2xl max-w-[400px] text-center font-bold">Application Lifecycle Management Tool №1</p>
      </div>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
