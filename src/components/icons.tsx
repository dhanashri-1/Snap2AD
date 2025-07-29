import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 15.5V12" />
      <path d="M12 9.5V6" />
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="M16 3.1a9 9 0 0 1 5.8 2.3" />
      <path d="M2.2 5.4a9 9 0 0 1 5.8-2.3" />
      <path d="M21.8 18.6a9 9 0 0 1-5.8 2.3" />
      <path d="M8 20.9a9 9 0 0 1-5.8-2.3" />
    </svg>
  );
}
