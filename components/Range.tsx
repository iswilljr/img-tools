import { Input } from './Input';

interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'type'> {
  id: string;
  value: number;
  max: number;
  min: number;
  labelLeft: string;
  labelRight?: string;
}

export function Range({ labelLeft, labelRight, ...props }: RangeProps) {
  const percentage = props.max <= 100 ? props.value - 5 : (props.value / props.max) * 100;

  return (
    <Input
      {...props}
      type="range"
      label={
        <>
          <span
            className="min-w-6 absolute hidden h-6 items-center justify-center rounded bg-white p-1 text-black group-hover:flex"
            id="indicator"
            style={{ left: `clamp(0px, ${percentage}% - 12px, 100% - 24px)` }}
          >
            {`${props.value}%`}
          </span>
          <div className="flex items-center justify-between">
            <p>{labelLeft}</p>
            {labelRight && <p>{labelRight}</p>}
          </div>
        </>
      }
    />
  );
}
