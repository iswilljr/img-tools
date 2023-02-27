import { Button } from './Button';

export interface FormButtonsProps {
  label: string;
  disabled: boolean;
  loading?: boolean;
}

export function FormButtons({ label, disabled, loading }: FormButtonsProps) {
  return (
    <div>
      <Button variant="dark" type="reset" disabled={disabled}>
        Reset
      </Button>
      <Button
        className="mb-6 flex items-center justify-center"
        type="submit"
        disabled={disabled}
        loading={loading ?? disabled}
      >
        {label}
      </Button>
    </div>
  );
}
