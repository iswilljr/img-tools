import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'mt-5 w-full rounded-md border px-6 py-2 hover:border-secondary-6 active:scale-[1.01] disabled:cursor-not-allowed disabled:text-white/50',
        className,
        {
          'border-primary-8 bg-primary-6 disabled:bg-primary-8/50': variant === 'primary',
          'border-gray-700 bg-dark-8 disabled:bg-dark-8/50': variant === 'dark',
        }
      )}
    />
  );
}
