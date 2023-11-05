import React, { FC } from 'react';

import { IconSvgProps } from '@nextui-org/shared-icons/dist/types';

export const ReportIcon: FC<IconSvgProps> = (props) => (
  <svg height="20" width="20" viewBox="0 0 24 24" {...props}>
    <path
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8
         8-8 8 3.589 8 8-3.589 8-8 8z"
      fill="#18181b"
    />
    <path d="m9 17 8-5-8-5z" fill="#18181b" />
  </svg>
);
