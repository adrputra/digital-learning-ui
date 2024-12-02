import React from 'react';
import { AspectRatio, Stack } from '@mantine/core';

interface IconContainerProps {
  children: React.ReactNode;
  x?: number;
  y?: number;
}

export default function IconContainer({ children, x = 50, y = 50 }: IconContainerProps) {
  return (
    <AspectRatio ratio={x / y}>
      <Stack>{children}</Stack>
    </AspectRatio>
  );
}
