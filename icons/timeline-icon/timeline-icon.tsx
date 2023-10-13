import { FC } from 'react';

import { IconSvgProps } from '@nextui-org/shared-icons/dist/types';

export const TimelineIcon: FC<IconSvgProps> = (props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_17_30)">
        <path
          d="M16.24 7.76C15.07 6.59 13.54 6 12 6V12L7.76 16.24C10.1 18.58 13.9 18.58 16.25 16.24C18.59 13.9 18.59 10.1
             16.24 7.76ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12
             20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_17_30">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
