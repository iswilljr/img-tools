import clsx from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  data: readonly string[];
}

export function Select({ label, data, className, ...props }: SelectProps) {
  return (
    <div className="mt-2 flex flex-col">
      <label className="text-md" htmlFor="format">
        {label}
      </label>
      <select
        {...props}
        className={clsx(
          'mt-2 w-full rounded-md border-gray-700 bg-dark-8 py-2 outline-none focus:border-secondary-6 focus:ring-0 disabled:cursor-not-allowed disabled:border-gray-700/50 disabled:bg-dark-8/50 disabled:text-white/50',
          className
        )}
        name={props.name ?? props.id}
      >
        {data.map(value => (
          <option key={value} value={value}>
            {value.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
