import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group, Menu, Text, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import LanguageIcon from '@/components/atoms/LanguageIcon';

export default function LanguageIconMolecule() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hovered, ref } = useHover();
  const queryParams = new URLSearchParams(location.search);
  const initialLanguage = queryParams.get('lang') || 'en';
  const theme = useMantineTheme();

  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.has('lang')) {
      params.set('lang', language);
      navigate(`${location.pathname}?${params.toString()}`);
    }
  }, [language, location.pathname, navigate]);

  const languageLabel = useMemo(() => {
    switch (language) {
      case 'en':
        return 'English';
      case 'id':
        return 'Bahasa';
      default:
        setLanguage('en');
        return 'English';
    }
  }, [language]);

  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Group
          ref={ref}
          gap={1}
          style={{
            cursor: 'pointer',
          }}
        >
          <LanguageIcon />
          <Text
            size="sm"
            p="xs"
            style={{
              borderRadius: '5px',
              backgroundColor: hovered ? theme.colors.primary[8] : 'transparent',
            }}
          >
            {languageLabel}
          </Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => changeLanguage('en')}>English</Menu.Item>
        <Menu.Item onClick={() => changeLanguage('id')}>Bahasa</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
