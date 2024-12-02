import { Avatar, AvatarProps, Box } from '@mantine/core';

export default function ProfileAvatar({...props} : AvatarProps) {
  return (
    <Box style={{ cursor: 'pointer' }}>
      <Avatar {...props} />
    </Box>
  );
}
