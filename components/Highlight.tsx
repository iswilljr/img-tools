import clsx from 'clsx';
import React from 'react';

interface HeadingProps<As> {
  as?: As;
}

export function Highlight<As extends keyof JSX.IntrinsicElements = 'span'>({
  as,
  className,
  ...props
}: HeadingProps<As> & React.ComponentProps<As>) {
  const Component = (as ?? 'span') as unknown as React.ComponentType<any>;

  return (
    <Component
      className={clsx('bg-gradient-to-r from-primary-4 to-primary-6 bg-clip-text text-transparent', className)}
      {...props}
    />
  );
}
