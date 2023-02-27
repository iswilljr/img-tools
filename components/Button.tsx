import clsx from 'clsx';
import { IconLoader } from '@tabler/icons-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark';
  loading?: boolean;
}

export function Button({ variant = 'primary', className, loading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'mt-5 w-full rounded-md border px-6 py-2 active:scale-[1.01] disabled:cursor-not-allowed disabled:text-white/50',
        className,
        {
          'border-primary-3 bg-primary-6 hover:border-primary-1 disabled:border-primary-3/50 disabled:bg-primary-6/50 disabled:hover:border-primary-3/50':
            variant === 'primary',
          'border-gray-700 bg-dark-8 hover:border-gray-600 disabled:border-gray-700/50 disabled:bg-dark-8/50 disabled:hover:border-gray-700/50':
            variant === 'dark',
        }
      )}
    >
      {props.children}
      {loading && (
        <span className="ml-2 animate-spin">
          <IconLoader />
        </span>
      )}
    </button>
  );
}