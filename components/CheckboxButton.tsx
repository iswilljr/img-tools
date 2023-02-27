import { Button } from './Button';
import { Input } from './Input';

interface CheckboxButtonProps {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function CheckboxButton({ id, label, checked, disabled, onClick }: CheckboxButtonProps) {
  return (
    <Input
      className="hidden"
      type="checkbox"
      id={id}
      hidden
      checked={checked}
      readOnly
      label={
        <Button variant="dark" type="button" onClick={onClick} disabled={disabled}>
          {label}
        </Button>
      }
    />
  );
}
