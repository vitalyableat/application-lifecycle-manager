import { FC } from 'react';

type Props = {
  value: number;
  maxValue: number;
};

export const LineChart: FC<Props> = ({ value, maxValue }) => {
  return (
    <div className="w-full">
      <div
        className="rounded-md border-2 bg-secondary-100 border-secondary-200 h-10"
        style={{ width: (value * 100) / (maxValue || 1) + '%' }}
      />
    </div>
  );
};
