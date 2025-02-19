'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api';

export default function NewLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFailure, setIsFailure] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      setIsLoading(false)
      navigate('/main/dashboard');
    } catch (error: any) {
      setErrorMsg(error?.message)
      setIsFailure(true)
      setIsLoading(false)
    }
  };

  const navigate = useNavigate();
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Entre na sua conta</Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input value={email}
              onChange={(e) => setEmail(e.target.value)} type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input value={password}
              onChange={(e) => setPassword(e.target.value)} type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Lembrar senha</Checkbox>
              <Text color={'blue.500'}>Esqueceu a senha?</Text>
            </Stack>
            <Button isLoading={isLoading} onClick={handleLogin} colorScheme={'blue'} variant={'solid'}>
              {isLoading ? "Carregando..." : "Acessar"}
            </Button>
            {isFailure && (
              <VStack borderRadius={5} w="full" mt={5} bg="red.300" p={3}>
                <Text textColor="white" textAlign="center">{errorMsg}</Text>
              </VStack>
            )}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://i.postimg.cc/vQD707Kb/oficina-login.webp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       '
          }
        />
      </Flex>
    </Stack>
  )
}