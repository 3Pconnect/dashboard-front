import React, { useState } from 'react';
import { Box, Button, HStack, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RegisterImage from '../resources/signup.svg'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isFailure, setIsFailure] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string>()


    const handleRegister = async () => {
        try {
            setIsLoading(true)
            await api.post('/auth/register', { username, email, password });
            setIsLoading(false)
            navigate('/');
        } catch (error: any) {
            setErrorMsg(error?.message)
            setIsFailure(true)
            setIsLoading(false)
        }
    };

    return (
        <Box w="100%" maxW="md" margin="auto" overflowX="hidden">
        <VStack p={{ base: 3, sm: 5 }} spacing={5}>
            <Image w={{ base: "80px", sm: "100px" }} src={RegisterImage} alt="Register Image" objectFit="contain" />
            <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} width="full" size="lg" />
            <Input placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} width="full" size="lg" />
            <Input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} width="full" size="lg" />
            <Button isLoading={isLoading} w="full" onClick={handleRegister} colorScheme="green" size="lg">
                {isLoading ? "Loading..." : "Sign Up"}
            </Button>
            {isFailure && (
                <VStack borderRadius={5} w="full" mt={5} bg="red.300" p={3}>
                    <Text textColor="white" textAlign="center">{errorMsg}</Text>
                </VStack>
            )}
            <HStack justify="center">
                <Text>Do you have already an account?</Text>
                <Button onClick={() => navigate("/")} textColor="green" variant="link">
                    Login
                </Button>
            </HStack>
        </VStack>
    </Box>

    );
};

export default Register;
