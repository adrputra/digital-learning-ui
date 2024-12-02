import { Group } from '@mantine/core';
import ThemeButton from '@/components/atoms/ThemeButton';
import LanguageIconMolecule from '@/components/molecules/LanguageIcon';
import LogoHeader from '@/components/molecules/LogoHeader';
import NavbarBurger from '@/components/molecules/NavbarBurger';
import ProfileMenuMolecule from '@/components/molecules/ProfileMenu';

export default function Header() {
  return (
    <Group justify="space-between" mx={18}>
      <Group>
        <NavbarBurger />
        <LogoHeader />
      </Group>
      <Group>
        <LanguageIconMolecule />
        <ThemeButton />
        <ProfileMenuMolecule />
      </Group>
    </Group>
  );
}
