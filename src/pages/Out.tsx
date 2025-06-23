import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Button, VStack, Link, useBreakpointValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, HStack, Image, Text } from '@chakra-ui/react';
import { FaHome, FaInfoCircle, FaCog, FaSignOutAlt, FaBars, FaUser, FaUsersCog, FaCalendarAlt, FaUpload } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { NovosMembrosList } from './NovosMembrosList';
import { fetchMe } from '../services/api';
import '../css/css.css';

function Out() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [permissoes, setPermissoes] = useState(['']);
  const padding = useBreakpointValue({ base: 0, md: 10 });

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

  useEffect(() => {
    console.log(permissoes);
    const hasPermission = permissoes.includes('create.usuario');
    console.log(hasPermission);
  }, [permissoes]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedOut(true);
    navigate('/');
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const toggleSubMenu = (menuKey: any) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey);
  };

  return (
    <Flex minHeight="100vh" backgroundColor="#f8f9fa" color="white">
      {/* Menu Lateral para dispositivos grandes */}
      <Box
        bg={"red"}
        width={{ base: '100%', md: '250px' }}
        backgroundColor="#132132"
        padding={4}
        boxShadow="md"
        display={{ base: 'none', md: 'flex' }}
        flexDirection="column"
        alignItems="flex-start"
      >
        <HStack mb={6}>
          <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo Mecânicos Premium" boxSize="50px" />
        </HStack>

        <VStack spacing={4} align="start" width="100%">
          {/* Dashboard */}
          <Link
            className='button-menu-nav'
            href="#"
            display="flex"
            alignItems="center"
            color="white"
            onClick={() => navigate('/main/dashboard')}
          >
            <FaHome style={{ marginRight: '8px' }} />
            <Text className="indicator-title">Dashboard</Text>
          </Link>

          {/* Categoria Cadastros (AGORA COM "Agenda" e "Gestão" movidos para cá) */}
          <Box width="100%">
            <Link
              className='button-menu-nav'
              href="#"
              display="flex"
              alignItems="center"
              color="white"
              onClick={() => toggleSubMenu('cadastros')}
            >
              <FaUser style={{ marginRight: '8px' }} />
              <Text className="indicator-title">Cadastros</Text>
            </Link>
            {activeMenu === 'cadastros' && (
              <VStack align="start" spacing={2} pl={6}>
                {permissoes.includes('read.users') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/users')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Usuários</Text>
                  </Link>
                )}
                {permissoes.includes('read.profiles') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/perfis')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Perfis</Text>
                  </Link>
                )}
                {permissoes.includes('read.membros') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/novos-membros')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Membros</Text>
                  </Link>
                )}
                {permissoes.includes('read.apoiadores') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/apoiadores')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Apoiadores</Text>
                  </Link>
                )}
                {/* Item movido de Eventos para Cadastros */}
                {permissoes.includes('manage.eventos') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/agenda-eventos')}
                  >
                    <FaCalendarAlt style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Eventos</Text>
                  </Link>
                )}
                {/* Item movido de Compras para Cadastros */}
                {permissoes.includes('manage.compras') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/list-evento-compras')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Relatório</Text>
                  </Link>
                )}
              </VStack>
            )}
          </Box>

          {/* Categoria Eventos (REMOVIDA a "Agenda" daqui) */}
          <Box width="100%">
            <Link
              href="#"
              display="flex"
              alignItems="center"
              color="white"
              className='button-menu-nav'
              onClick={() => toggleSubMenu('eventos')}
            >
              <FaCalendarAlt style={{ marginRight: '8px' }} />
              <Text className="indicator-title">Eventos</Text>
            </Link>
            {activeMenu === 'eventos' && (
              <VStack align="start" spacing={2} pl={6}>
                {permissoes.includes('eventos.inscricao') && (
                  <>
                    <Link
                      href="#"
                      display="flex"
                      alignItems="center"
                      color="white"
                      className='button-menu-nav'
                      onClick={() => navigate('/main/todos-eventos')}
                    >
                      <FaCalendarAlt style={{ marginRight: '8px' }} />
                      <Text className="indicator-title">Todos</Text>
                    </Link>
                    <Link
                      href="#"
                      display="flex"
                      alignItems="center"
                      color="white"
                      className='button-menu-nav'
                      onClick={() => navigate('/main/meus-eventos')}
                    >
                      <FaCalendarAlt style={{ marginRight: '8px' }} />
                      <Text className="indicator-title">Meus eventos</Text>
                    </Link>
                  </>
                )}
              </VStack>
            )}
          </Box>

          {/* Categoria Compras (REMOVIDA a "Gestão" daqui) */}
          <Box width="100%">
            <Link
              href="#"
              display="flex"
              alignItems="center"
              color="white"
              className='button-menu-nav'
              onClick={() => toggleSubMenu('compras')}
            >
              <FaUsersCog style={{ marginRight: '8px' }} />
              <Text className="indicator-title">Compras</Text>
            </Link>
            {activeMenu === 'compras' && (
              <VStack align="start" spacing={2} pl={6}>
                <Link
                  href="#"
                  display="flex"
                  alignItems="center"
                  color="white"
                  className='button-menu-nav'
                  onClick={() => navigate('/main/list-compra-coletiva')}
                >
                  <FaUsersCog style={{ marginRight: '8px' }} />
                  <Text className="indicator-title">Aquisições</Text>
                </Link>
                {permissoes.includes('manage.compras') && (
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                    className='button-menu-nav'
                    onClick={() => navigate('/main/list-product')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    <Text className="indicator-title">Produtos</Text>
                  </Link>
                )}
              </VStack>
            )}
          </Box>

          {/* Logout */}
          <Link
            href="#"
            display="flex"
            alignItems="center"
            color="white"
            className='button-menu-nav'
            onClick={handleLogout}
          >
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            <Text className="indicator-title">Sair</Text>
          </Link>
        </VStack>
      </Box>

      {/* Menu Lateral Responsivo (Drawer) - MESMAS ALTERAÇÕES APLICADAS AQUI */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Button onClick={onOpen} colorScheme="teal" variant="ghost">
          <FaBars />
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <HStack justify="center">
                <Image m={5} w={"30px"} src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" />
                <Heading color={"#182433"} fontSize="md">Mecânicos Premium</Heading>
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="start" width="100%">
                {/* Dashboard */}
                <Link
                  href="#"
                  display="flex"
                  alignItems="center"
                  color="black"
                  _hover={{ color: 'teal.400' }}
                  onClick={() => navigate('/main/dashboard')}
                >
                  <FaHome style={{ marginRight: '8px' }} />
                  Dashboard
                </Link>

                {/* Cadastros (Drawer) - COM ITENS MOVIDOS */}
                <Box width="100%">
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="black"
                    _hover={{ color: 'teal.400' }}
                    onClick={() => toggleSubMenu('cadastros')}
                  >
                    <FaUser style={{ marginRight: '8px' }} />
                    Cadastros
                  </Link>
                  {activeMenu === 'cadastros' && (
                    <VStack align="start" spacing={2} pl={6}>
                      {permissoes.includes('read.users') && (
                        <Link
                          pt={3}
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/users')}
                        >
                          <FaUsersCog style={{ marginRight: '8px' }} />
                          Usuários
                        </Link>
                      )}
                      {permissoes.includes('read.profiles') && (
                        <Link
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/perfis')}
                        >
                          <FaUsersCog style={{ marginRight: '8px' }} />
                          Perfis
                        </Link>
                      )}
                      {permissoes.includes('read.membros') && (
                        <Link
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/novos-membros')}
                        >
                          <FaUsersCog style={{ marginRight: '8px' }} />
                          Novos Membros
                        </Link>
                      )}
                      {permissoes.includes('read.apoiadores') && (
                        <Link
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/apoiadores')}
                        >
                          <FaUsersCog style={{ marginRight: '8px' }} />
                          Novos Parceiros
                        </Link>
                      )}
                      {/* Item movido de Eventos para Cadastros */}
                      {permissoes.includes('manage.eventos') && (
                        <Link
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/agenda-eventos')}
                        >
                          <FaCalendarAlt style={{ marginRight: '8px' }} />
                          Eventos
                        </Link>
                      )}
                      {/* Item movido de Compras para Cadastros */}
                      {permissoes.includes('manage.compras') && (
                        <Link
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/list-evento-compras')}
                        >
                          <FaUsersCog style={{ marginRight: '8px' }} />
                          Relatório
                        </Link>
                      )}
                    </VStack>
                  )}
                </Box>

                {/* Eventos (Drawer) - SEM "Agenda" */}
                <Box width="100%">
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="black"
                    _hover={{ color: 'teal.400' }}
                    onClick={() => toggleSubMenu('eventos')}
                  >
                    <FaCalendarAlt style={{ marginRight: '8px' }} />
                    Eventos
                  </Link>
                  {activeMenu === 'eventos' && (
                    <VStack align="start" spacing={2} pl={6}>
                      {permissoes.includes('eventos.inscricao') && (
                        <>
                          <Link
                            href="#"
                            display="flex"
                            alignItems="center"
                            color="black"
                            _hover={{ color: 'teal.400' }}
                            onClick={() => navigate('/main/todos-eventos')}
                          >
                            <FaCalendarAlt style={{ marginRight: '8px' }} />
                            Eventos
                          </Link>
                          <Link
                            href="#"
                            display="flex"
                            alignItems="center"
                            color="black"
                            _hover={{ color: 'teal.400' }}
                            onClick={() => navigate('/main/meus-eventos')}
                          >
                            <FaCalendarAlt style={{ marginRight: '8px' }} />
                            Meus Eventos
                          </Link>
                        </>
                      )}
                    </VStack>
                  )}
                </Box>

                {/* Compras (Drawer) - SEM "Gestão" */}
                <Box width="100%">
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="black"
                    _hover={{ color: 'teal.400' }}
                    onClick={() => toggleSubMenu('compras')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Compras
                  </Link>
                  {activeMenu === 'compras' && (
                    <VStack align="start" spacing={2} pl={6}>
                      <Link
                        href="#"
                        display="flex"
                        alignItems="center"
                        color="black"
                        _hover={{ color: 'teal.400' }}
                        onClick={() => navigate('/main/list-compra-coletiva')}
                      >
                        <FaUsersCog style={{ marginRight: '8px' }} />
                        Aquisições
                      </Link>
                      {permissoes.includes('manage.compras') && (
                        <Link
                          href="#"
                          display="flex"
                          alignItems="center"
                          color="black"
                          _hover={{ color: 'teal.400' }}
                          onClick={() => navigate('/main/list-product')}
                        >
                          <FaUsersCog style={{ marginRight: '8px' }} />
                          Produtos
                        </Link>
                      )}
                    </VStack>
                  )}
                </Box>

                {/* Logout */}
                <Link
                  href="#"
                  display="flex"
                  alignItems="center"
                  color="black"
                  _hover={{ color: 'teal.400' }}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt style={{ marginRight: '8px' }} />
                  Sair
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* Conteúdo Principal */}
      <Box pl={padding} pt={10} pr={10} pb={10} w={"full"}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Out;