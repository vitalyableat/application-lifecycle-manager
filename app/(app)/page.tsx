'use client';
import { getClientLocale, getDictionary } from '@/dictionaries';
import useAuthStore from '@/services/auth';

type Greeting = 'goodNight' | 'goodMorning' | 'goodAfternoon' | 'goodEvening';
const GREETINGS: Greeting[] = ['goodNight', 'goodMorning', 'goodAfternoon', 'goodEvening'];

const HomePage = () => {
  const d = getDictionary(getClientLocale());
  const user = useAuthStore((state) => state.user);
  const hours = new Date().getHours();
  const greeting = GREETINGS[+(hours / 6).toString()[0]];

  return (
    user && (
      <main className="font-bold text-3xl h-full w-full flex items-center justify-center">
        {d.pages.home[greeting]}, {user?.name} {user?.surname}!
      </main>
    )
  );
};

export default HomePage;
