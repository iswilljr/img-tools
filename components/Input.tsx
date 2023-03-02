import clsx from 'clsx';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: React.ReactNode;
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>;
}

export function Input({ className, label, labelProps, ...props }: InputProps) {
  return (
    <div className="group relative mt-2">
      <label
        {...labelProps}
        className={clsx('text-md', labelProps?.className, {
          'text-white/50': props.disabled,
        })}
        htmlFor={props.name ?? props.id}
      >
        {label}
      </label>
      <input
        {...props}
        name={props.name ?? props.id}
        className={clsx(
          'mt-2 w-full rounded-md border-gray-700 bg-dark-8 py-2 outline-none hover:border-gray-600 focus:border-gray-600 focus:ring-0 disabled:cursor-not-allowed disabled:border-gray-700/50 disabled:bg-dark-8/50 disabled:text-white/50',
          {
            'px-4': props.type !== 'range',
          },
          className
        )}
      />
    </div>
  );
}
