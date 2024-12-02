import { IconTrash } from '@tabler/icons-react';
import { Button, Group, Modal, Text } from '@mantine/core';

interface Props {
  open: boolean;
  close: () => void;
  title?: string;
  message?: string | React.ReactNode;
  onConfirm: () => void;
}

export default function DeleteDialogue({
  open,
  close,
  title = 'Delete',
  message = 'Are you sure?',
  onConfirm,
}: Props) {
  const Title = () => {
    return (
      <Group align='center'>
        <IconTrash color="red" />
        <Text size="xl" fw={900}>{title}</Text>
      </Group>
    );
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title={<Title />}
      centered
      closeOnClickOutside={false}
      keepMounted={false}
    >
      <Text>{message}</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
