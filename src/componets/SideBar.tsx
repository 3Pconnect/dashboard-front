import React, { useState } from 'react';
import { Box, VStack, Text, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { FaUser, FaCalendarAlt, FaUsersCog, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

type SideBarProps = {
  isMobile?: boolean;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
};

export const SideBar = ({ isMobile, isOpenDrawer, onCloseDrawer }: SideBarProps) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const permissoes = JSON.parse(localStorage.getItem('permissoes') || '[]');

  const toggleSubMenu = (menuKey: string) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey);
  };

  const menus = [
    {
      key: 'cadastros',
      icon: FaUser,
      label: 'Cadastros',
      subItems: [
        { label: 'Usuários', path: '/main/users', permission: 'read.users' },
        { label: 'Perfis', path: '/main/perfis', permission: 'read.profiles' },
        { label: 'Membros', path: '/main/novos-membros', permission: 'read.membros' },
        { label: 'Apoiadores', path: '/main/apoiadores', permission: 'read.apoiadores' },
      ],
    },
    {
      key: 'eventos',
      icon: FaCalendarAlt,
      label: 'Eventos',
      subItems: [
        { label: 'Todos', path: '/main/todos-eventos', permission: 'eventos.inscricao' },
        { label: 'Meus eventos', path: '/main/meus-eventos', permission: 'eventos.inscricao' },
        { label: 'Agenda', path: '/main/agenda-eventos', permission: 'manage.eventos' },
      ],
    },
    {
      key: 'compras',
      icon: FaUsersCog,
      label: 'Compras',
      subItems: [
        { label: 'Gestão', path: '/main/list-evento-compras', permission: 'manage.compras' },
        { label: 'Todas', path: '/main/list-compra-coletiva' },
        { label: 'Produtos', path: '/main/list-product', permission: 'manage.compras' },
      ],
    },
  ];

  const renderMenu = () => (
    <VStack spacing={4} align="start" p={4} color="white" width="100%">
      <Box as="button" className="button-menu-nav" display="flex" alignItems="center" onClick={() => navigate('/main/dashboard')}>
        <FaHome style={{ marginRight: '8px' }} />
        <Text className="indicator-title">Dashboard</Text>
      </Box>

      {menus.map((menu) => (
        <Box key={menu.key} width="100%">
          <Box as="button" onClick={() => toggleSubMenu(menu.key)} className="button-menu-nav" display="flex" alignItems="center">
            <menu.icon style={{ marginRight: '8px' }} />
            <Text className="indicator-title">{menu.label}</Text>
          </Box>

          {activeMenu === menu.key && (
            <VStack align="start" spacing={2} pl={6}>
              {menu.subItems.map(({ label, path, permission }) =>
                !permission || permissoes.includes(permission) ? (
                  <Box
                    key={label}
                    as="button"
                    onClick={() => navigate(path)}
                    className="button-menu-nav"
                    display="flex"
                    alignItems="center"
                    color="white"
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">{label}</Text>
                  </Box>
                ) : null
              )}
            </VStack>
          )}
        </Box>
      ))}
    </VStack>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={!!isOpenDrawer} placement="left" onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton />
          <DrawerBody>{renderMenu()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box
      width="250px"
      height="100vh"
      position="fixed"
      top={0}
      left={0}
      bg="gray.800"
      padding="20px"
      color="white"
      zIndex="999"
    >
      {renderMenu()}
    </Box>
  );
};
