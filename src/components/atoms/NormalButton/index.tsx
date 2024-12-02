import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';
import { forwardRef } from 'react';

interface NormalButtonProps extends ButtonProps {
  label: string;
}

const NormalButton = createPolymorphicComponent<'button', NormalButtonProps>(
  forwardRef<HTMLButtonElement, NormalButtonProps>(({ label, ...others }, ref) => (
    <Button ref={ref} {...others}>
      {label}
    </Button>
  ))
);

// function NormalButton({ label, ...props }: NormalButtonProps) {
//   return <Button {...props}>{label}</Button>;
// }
export default NormalButton;
