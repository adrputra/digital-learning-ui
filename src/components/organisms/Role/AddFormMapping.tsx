import { useEffect, useState } from 'react';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AccessMethodMultiSelect from '@/components/atoms/AccessMethodMultiSelect';
import MenuInputSelection from '@/components/atoms/MenuInputSelection';
import RoleInputSelection from '@/components/atoms/RoleInputSelection';
import { useRoleStore } from '@/store/role';

interface Props {
  open: boolean;
  close: () => void;
  isEdit?: boolean;
  data?: RoleMapping;
}

export default function AddFormMapping({ open, close, isEdit = false, data }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { getRoleMapping, createRoleMapping, updateRoleMapping } = useRoleStore();
  const [request, setRequest] = useState<RequestNewRoleMapping>({
    id: '',
    menu_id: '',
    role_id: '',
    access_method: '',
  });

  useEffect(() => {
    if (isEdit) {
      setRequest({
        id: data!.id,
        menu_id: data!.menu_id,
        role_id: data!.role_id,
        access_method: data!.access_method,
      });
    }
    return () => {
      setRequest({
        id: '',
        menu_id: '',
        role_id: '',
        access_method: '',
      });
    };
  }, [open]);

  const handleSubmit = async () => {
    setLoading.open();
    isEdit ? await updateRoleMapping(request) : await createRoleMapping(request);
    onClose();
  };

  const onClose = async () => {
    await getRoleMapping();
    setLoading.close();
    close();
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title={isEdit ? 'Edit Role Mapping' : 'Add New Role Mapping'}
      centered
      closeOnClickOutside={false}
    >
      <Stack my="md">
        {isEdit ? (
          <>
            <TextInput label="Menu Name" withAsterisk value={data?.menu_name} disabled />
            <TextInput label="Role Name" withAsterisk value={data?.role_name} disabled />
          </>
        ) : (
          <>
            <MenuInputSelection
              label="Menu Name"
              placeholder="Select Menu"
              withAsterisk
              disabled={isEdit}
              onChange={(value, option) =>
                setRequest({ ...request, menu_id: value ?? option.value })
              }
            />
            <RoleInputSelection
              label="Role Name"
              placeholder="Select Role"
              withAsterisk
              required
              disabled={isEdit}
              onChange={(value, option) =>
                setRequest({ ...request, role_id: value ?? option.value })
              }
            />
          </>
        )}

        <AccessMethodMultiSelect
          label="Access Method"
          placeholder="Select Access Method"
          withAsterisk
          required
          value={request.access_method ? request.access_method.split(',') : []}
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
        {isEdit ? 'Edit' : 'Create'}
      </Button>
    </Modal>
  );
}
