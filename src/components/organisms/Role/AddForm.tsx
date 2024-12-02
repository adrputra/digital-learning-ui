import { useState } from 'react';
import { Button, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { createNewRoleMapping } from '@/api/role';
import AccessMethodMultiSelect from '@/components/atoms/AccessMethodMultiSelect';
import MenuInputSelection from '@/components/atoms/MenuInputSelection';
import RoleInputSelection from '@/components/atoms/RoleInputSelection';
import { useRoleStore } from '@/store/role';

interface Props {
  open: boolean;
  close: () => void;
}

export default function AddForm({ open, close }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { getRoleMapping } = useRoleStore();
  const [request, setRequest] = useState<RequestNewRoleMapping>({
    menu_id: '',
    role_id: '',
    access_method: '',
  });

  const handleSubmit = async () => {
    setLoading.open();
    await createNewRoleMapping(request)
      .then((res) => {
        if (res.code === 200) {
          showNotification({
            color: 'green',
            title: 'Success',
            message: res.message,
          });
          onClose();
        }
      })
      .catch((err) => {
        showNotification({
          color: 'red',
          title: 'Error',
          message: err?.response?.data?.message || err?.response?.data || err?.message,
        });
      })
      .finally(() => setLoading.close());
  };

  const onClose = async () => {
    await getRoleMapping();
    close();
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Add New Role Mapping"
      centered
      closeOnClickOutside={false}
    >
      <Stack my="md">
        <MenuInputSelection
          label="Menu Name"
          placeholder="Select Menu"
          withAsterisk
          onChange={(value, option) => setRequest({ ...request, menu_id: value ?? option.value })}
        />
        <RoleInputSelection
          label="Role Name"
          placeholder="Select Role"
          withAsterisk
          required
          onChange={(value, option) => setRequest({ ...request, role_id: value ?? option.value })}
        />
        <AccessMethodMultiSelect
          label="Access Method"
          placeholder="Select Access Method"
          withAsterisk
          required
          onChange={(value) => setRequest({ ...request, access_method: value.join(',') })}
        />
      </Stack>

      <Button
        fullWidth
        onClick={() => handleSubmit()}
        mt="xl"
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        Create
      </Button>
    </Modal>
  );
}
