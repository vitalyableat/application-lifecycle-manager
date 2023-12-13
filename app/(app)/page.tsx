'use client';
import useAuthStore from '@/services/auth';

const GREETINGS = ['Good night', 'Good morning', 'Good afternoon', 'Good evening'];

const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const hours = new Date().getHours();
  const greeting = GREETINGS[+(hours / 6).toString()[0]];

  return (
    user && (
      <main className="font-bold text-3xl h-full w-full flex items-center justify-center">
        {greeting}, {user?.name} {user?.surname}!
      </main>
    )
  );
};

export default HomePage;
