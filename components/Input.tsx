import clsx from 'clsx';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
}

export function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="mt-2">
      <label className="text-md" htmlFor={props.name ?? props.id}>
        {label}
      </label>
      <input
        {...props}
        name={props.name ?? props.id}
        className={clsx(
          'mt-2 w-full rounded-md border-gray-700 bg-dark-8 px-4 py-2 text-white outline-none invalid:border-red-500 focus:border-secondary-6 focus:ring-0 disabled:cursor-not-allowed disabled:border-gray-700/50 disabled:bg-dark-8/50 disabled:text-white/50',
          className
        )}
      />
    </div>
  );
}
