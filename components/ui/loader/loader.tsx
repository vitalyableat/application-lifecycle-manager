'use client';
import { FC, useLayoutEffect, useRef, useState } from 'react';

import { Spinner } from '@nextui-org/spinner';

export const Loader: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  const findRelative = (node: HTMLElement): HTMLElement | null => {
    if (node.parentNode) {
      return String((node.parentNode as HTMLElement).className).includes('relative')
        ? (node.parentNode as HTMLElement)
        : findRelative(node?.parentNode as HTMLElement);
    }

    return null;
  };

  useLayoutEffect(() => {
    if (ref.current) {
      const parent = findRelative(ref.current);

      if (parent) {
        setTop(parent.scrollTop);
        const handleScroll = (event: Event) => {
          setTop((event.target as HTMLElement).scrollTop);
        };

        parent?.addEventListener('scroll', handleScroll);

        return () => parent?.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute top-[${top}px] left-0 w-full h-full flex justify-center items-center
        bg-default-100 bg-opacity-50 z-50 transition-none`}
      style={{ top: top }}>
      <Spinner size="lg" color="secondary" />
    </div>
  );
};
