import React from 'react';
import { NextPage } from 'next';

export const CreateProductIcon: NextPage = () => {
  return (
    <svg width="26%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 180 180">
      <g clipPath="url(#a)">
        <rect width={180} height={180} fill="#E6F0FF" rx={20} />
        <path
          fill="#91B9F7"
          d="M19.49 127.662 1.54 140.288a9.198 9.198 0 0 0-3.907 7.524v23.715a9.2 9.2 0 0 0 9.199 9.199h166.337a9.199 9.199 0 0 0 9.199-9.199v-38.133a9.201 9.201 0 0 0-3.363-7.112l-41.967-34.437c-6.545-5.371-16.089-4.939-22.122 1.002l-47.96 47.226c-4.296 4.231-11.193 4.231-15.49 0l-10.831-10.666a16.56 16.56 0 0 0-21.145-1.745Z"
        />
        <circle cx={17.419} cy={17.419} r={17.419} fill="#91B9F7" transform="matrix(-1 0 0 1 69.677 46.452)" />
      </g>
      <defs>
        <clipPath id="a">
          <rect width={180} height={180} fill="#fff" rx={20} />
        </clipPath>
      </defs>
    </svg>
  );
};
