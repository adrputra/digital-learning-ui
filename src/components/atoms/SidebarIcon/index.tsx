import { useCallback } from 'react';
import {
  IconBrandDatabricks,
  IconCategory,
  IconCircles,
  IconClockHour5,
  IconFlask,
  IconHome,
  IconIndentIncrease,
  IconSchool,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import IconContainer from '../IconContainer';

export default function SidebarIcon({ page }: { page: string }) {
  const renderIcon = useCallback((page: string) => {
    if (page === '/') {
      return <IconHome />;
    }
    if (page === '/experimental') {
      return <IconFlask />;
    }
    if (page === '/role') {
      return <IconCircles />;
    }
    if (page === '/menu') {
      return <IconCategory />;
    }
    if (page === '/student') {
      return <IconSchool />;
    }
    if (page === '/user') {
      return <IconUserSquareRounded />;
    }
    if (page === '/dataset') {
      return <IconBrandDatabricks />;
    }
    if (page === '/parameter') {
      return <IconIndentIncrease />;
    }
    return <IconClockHour5 />;
  }, []);
  return <IconContainer>{renderIcon(page.toLowerCase())}</IconContainer>;
}
