import React from 'react';
import { NotificationProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

interface NotificationAlertProps extends NotificationProps {
  message: string;
  type: 'success' | 'error';
  title?: string;
}

export default function NotificationAlert(props: NotificationAlertProps) {
  const { message, type, title = '' } = props;
  return (
    <Notifications title={title} position="top-center" color={type === 'success' ? 'green' : 'red'} autoClose={3000}>
      {message}
    </Notifications>
  );
}
