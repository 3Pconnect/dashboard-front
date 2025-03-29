import React, { useEffect, useState } from 'react';
import { 
  Box, Flex, VStack, Link, useBreakpointValue, Drawer, 
  DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, 
  DrawerCloseButton, useDisclosure, HStack, Image, Button 
} from '@chakra-ui/react';
import { 
  FaHome, FaUsersCog, FaCalendarAlt, FaSignOutAlt, FaBars, FaUser 
} from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchMe } from '../services/api';

function Out() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const padding = useBreakpointValue({ base: 4, md: 10 });
  const sidebarWidth = useBreakpointValue({ base: '100%', md: '250px' });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchMe();
        setPermissoes(data.profile.permissions);
      } catch (error) {
        console.error(error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Flex minHeight="100vh" backgroundColor="#060c32" color="white">
      {/* Menu Lateral (Desktop) */}
      <Box 
        width={sidebarWidth} 
        bg="#07104A"
        p={4}
        boxShadow="md"
        display={{ base: 'none', md: 'flex' }}
        flexDirection="column"
        minHeight="100vh"
      >
        <HStack mb={6}>
          <Image 
            src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" 
            alt="Logo" 
            boxSize="50px" 
          />
        </HStack>

        <VStack spacing={4} align="start" width="100%">
          <Link onClick={() => navigate('/main/dashboard')} display="flex" alignItems="center">
            <FaHome style={{ marginRight: '8px' }} />
            Dashboard
          </Link>

          {permissoes.includes('read.users') && (
            <Link onClick={() => navigate('/main/users')} display="flex" alignItems="center">
              <FaUsersCog style={{ marginRight: '8px' }} />
              Usuários
            </Link>
          )}

          <Link onClick={() => navigate('/main/agenda-eventos')} display="flex" alignItems="center">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Agenda de Eventos
          </Link>

          <Link onClick={handleLogout} display="flex" alignItems="center">
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            Sair
          </Link>
        </VStack>
      </Box>

      {/* Menu Lateral (Mobile) */}
      <Box display={{ base: 'block', md: 'none' }} position="absolute" top="10px" left="10px">
        <Button onClick={onOpen} variant="ghost" color="white">
          <FaBars />
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent bg="white">
            <DrawerCloseButton />
            <DrawerHeader>
              <HStack justify="center">
                <Image w="30px" src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" />
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="start">
                <Link onClick={() => navigate('/main/dashboard')} display="flex" alignItems="center">
                  <FaHome style={{ marginRight: '8px' }} />
                  Dashboard
                </Link>

                {permissoes.includes('read.users') && (
                  <Link onClick={() => navigate('/main/users')} display="flex" alignItems="center">
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Usuários
                  </Link>
                )}

                <Link onClick={() => navigate('/main/agenda-eventos')} display="flex" alignItems="center">
                  <FaCalendarAlt style={{ marginRight: '8px' }} />
                  Agenda de Eventos
                </Link>

                <Link onClick={handleLogout} display="flex" alignItems="center">
                  <FaSignOutAlt style={{ marginRight: '8px' }} />
                  Sair
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* Conteúdo Principal */}
      <Box flex="1" p={padding}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Out;
