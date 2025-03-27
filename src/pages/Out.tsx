import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Button, VStack, Link, useBreakpointValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, HStack, Image } from '@chakra-ui/react';
import { FaHome, FaInfoCircle, FaCog, FaSignOutAlt, FaBars, FaUser, FaUsersCog, FaCalendarAlt, FaUpload } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { NovosMembrosList } from './NovosMembrosList';
import { fetchMe } from '../services/api';
import '../css/css.css'

function Out() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [permissoes, setPermissoes] = useState([''])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchMe();
        setPermissoes(data.profile.permissions)
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    console.log(permissoes);
    const hasPermission = permissoes.includes('create.usuario');
    console.log(hasPermission);
  }, [permissoes]);

  // Função de logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedOut(true);
    navigate('/')

    // Aqui você pode adicionar a lógica para logout, como limpar cookies, redirecionar para uma página de login, etc.
  };

  // Estado para gerenciar os submenus
  const [activeMenu, setActiveMenu] = useState(null);

  // Função para alternar a visibilidade dos submenus
  const toggleSubMenu = (menuKey: any) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey);
  };

  return (
    <Flex minHeight="100vh" backgroundColor="#060c32" color="white">
      {/* Menu Lateral para dispositivos grandes */}
      <Box 
        width={{ base: '100%', md: '250px' }}
        backgroundColor="#07104A"
        padding={4}
        boxShadow="md"
        display={{ base: 'none', md: 'flex' }}
        flexDirection="column"
        alignItems="flex-start"
      >
        {/* Logo no Menu Lateral (Desktop) */}
        <HStack mb={6}>
          <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo Mecânicos Premium" boxSize="50px" />
        </HStack>

        <VStack spacing={4} align="start" width="100%">
          {/* Menu de Navegação */}
          <Link
          className='button-menu-nav'
            href="#"
            display="flex"
            alignItems="center"
            color="white"
  
            onClick={() => navigate('/main/dashboard')}
          >
            <FaHome style={{ marginRight: '8px' }} />
            Dashboard
          </Link>

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
              Cadastros
            </Link>
            {activeMenu === 'cadastros' && (
              <VStack align="start" spacing={2} pl={6}>
                {permissoes.includes('read.users') &&
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
          className='button-menu-nav'
                    onClick={() => navigate('/main/users')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Usuários
                  </Link>
                }
                {permissoes.includes('read.profiles') &&
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
                  className='button-menu-nav'
                    onClick={() => navigate('/main/perfis')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Perfis
                  </Link>
                }
                {permissoes.includes('read.membros') &&
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
             className='button-menu-nav'
                    onClick={() => navigate('/main/novos-membros')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Novos Membros
                  </Link>
                }

                {permissoes.includes('read.apoiadores') &&
                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
            className='button-menu-nav'
                    onClick={() => navigate('/main/apoiadores')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Novos Parceiros
                  </Link>
                }
                                  <Link
                    href="#"
                    display="flex"
                    alignItems="center"
                    color="white"
             className='button-menu-nav'
                    onClick={() => navigate('/main/list-product')}
                  >
                    <FaUsersCog style={{ marginRight: '8px' }} />
                    Produtos
                  </Link>
                {permissoes.includes('manage.eventos') &&
                <Link
                  href="#"
                  display="flex"
                  alignItems="center"
                  color="white"
       className='button-menu-nav'
                  onClick={() => navigate('/main/agenda-eventos')}
                >
                  <FaCalendarAlt style={{ marginRight: '8px' }} />
                  Agenda de Eventos
                </Link>}
              </VStack>
            )}
          </Box>

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
              Eventos
            </Link>
            {activeMenu === 'eventos' && (
              <VStack align="start" spacing={2} pl={6}>
  {permissoes.includes('eventos.inscricao') &&
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
                  Eventos
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
                  Meus Eventos
                </Link>
              </>
}
              </VStack>
            )}
          </Box>
{/* 
          <Link
            href="#"
            display="flex"
            alignItems="center"
            color="white"
            _hover={{ color: 'teal.400' }}
            onClick={() => navigate('/main/arquivos')}
          >
            <FaUpload style={{ marginRight: '8px' }} />
            Arquivos
          </Link> */}

          <Link
            href="#"
            display="flex"
            alignItems="center"
            color="white"
         className='button-menu-nav'
            onClick={handleLogout}
          >
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            Sair
          </Link>
        </VStack>
      </Box>

      {/* Menu Lateral Responsivo (Drawer) */}
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
                {/* Menu no Drawer */}
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
                    <VStack align="start" spacing={6} pl={6}>
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
                    </VStack>
                  )}
                </Box>

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
      <Box p={10} w={"full"}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Out;
