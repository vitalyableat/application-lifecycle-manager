import { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] justify-center text-center">
      <p className="text-3xl font-bold w-full">Page not found :(</p>
    </div>
  );
};

export default NotFoundPage;
