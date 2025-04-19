'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Image,
  VStack,
  Box
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { fetchMe } from '../services/api';
import { savePermissionsToLocalStorage } from '../utils/util';
import { Input } from 'antd';

export default function NewLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFailure, setIsFailure] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()
  const [permissoes, setPermissoes] = useState([''])

  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const data = await fetchMe();
      setPermissoes(data.profile.permissions);
      savePermissionsToLocalStorage(data.profile.permissions)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const hasPermission = permissoes.includes('create.usuario');
    console.log('Permissões:', permissoes);
    console.log('Tem permissão create.usuario:', hasPermission);
  }, [permissoes]);

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      await loadUser()
      setIsLoading(false)
      navigate('/main/todos-eventos');
      window.location.reload();
    } catch (error: any) {
      setErrorMsg(error?.message)
      setIsFailure(true)
      setIsLoading(false)
    }
  };

  return (
    <Stack className="indicator-title" minH="100vh" direction={{ base: 'column', md: 'row' }}>
      {/* Coluna da esquerda - Formulário */}
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={6} w="full" maxW="md">
          <Box textAlign="center" mb={4}>
            <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo Mecânicos Premium" maxH="90px" mx="auto" />
          </Box>
          <Heading className='heading-title' textAlign={"center"} fontSize='2xl' >Entre na sua conta</Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              className="mecanicos-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Digite seu e-mail"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input
              className="mecanicos-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align="start"
              justify="space-between"
            >
              <Checkbox>Lembrar senha</Checkbox>
              <Text color="blue.500" cursor="pointer">Esqueceu a senha?</Text>
            </Stack>
            <Button
              className="button-premium"
              isLoading={isLoading}
              onClick={handleLogin}
              colorScheme="blue"
            >
              {isLoading ? "Carregando..." : "Acessar"}
            </Button>
            {isFailure && (
              <VStack borderRadius={5} w="full" mt={3} bg="red.400" p={3}>
                <Text textColor="white" textAlign="center">{errorMsg}</Text>
              </VStack>
            )}
          </Stack>
        </Stack>
      </Flex>

      {/* Coluna da direita - Imagem */}
      <Flex flex={1} display={{ base: 'none', md: 'flex' }}>
        <Image
          alt="Login Image"
          objectFit="cover"
          w="100%"
          h="100vh"
          src="https://i.postimg.cc/vQD707Kb/oficina-login.webp"
        />
      </Flex>
    </Stack>
  )
}
