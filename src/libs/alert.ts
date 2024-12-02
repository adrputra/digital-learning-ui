import { notifications } from "@mantine/notifications";

type status = 'success' | 'error' | 'warning' | 'info'
interface Props {
    title?: string
    message?: string
    status?: status
    withCloseButton?: boolean
}

export const showNotification = (props: Props = {status: 'success', withCloseButton: true}) => {
    let color;
    switch (props.status) {
        case 'success':
            color = 'green';
            break;
        case 'error':
            color = 'red';
            break;
        case 'warning':
            color = 'yellow';
            break;
        case 'info':
            color = 'blue';
            break;
        default:
            break;
    }
    notifications.show({
        title: props.status === 'success' ? (props.title || 'Success') : (props.title || 'Oopss!'),
        message: props.message || "",
        color,
        withCloseButton: true,
      });
}