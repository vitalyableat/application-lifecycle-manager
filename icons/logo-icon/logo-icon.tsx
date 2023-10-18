import { FC } from 'react';

import { IconSvgProps } from '@nextui-org/shared-icons/dist/types';

export const LogoIcon: FC<IconSvgProps> = (props) => (
  <svg height="36" width="36" viewBox="0 0 32 32" {...props}>
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394
         19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="#18181b"
      fillRule="evenodd"
    />
  </svg>
);
