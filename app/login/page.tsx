import { LoginForm } from '@/components/forms';
import { LogoIcon } from '@/components/icons';
import { getDictionary, getServerLocale } from '@/dictionaries';

const LoginPage = async () => {
  const d = getDictionary(await getServerLocale());

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="bg-secondary-200 min-w-fit w-2/5 h-full flex flex-col items-center justify-center p-5">
        <div className="flex items-center">
          <LogoIcon height="128" width="128" />
          <p className="text-7xl font-bold">{d.alm}</p>
        </div>
        <p className="text-2xl max-w-[400px] text-center font-bold">{d.pages.login.toolNumberOne}</p>
      </div>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
