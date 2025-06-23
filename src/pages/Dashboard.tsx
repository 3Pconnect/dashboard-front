import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>Welcome to the Admin Dashboard</Text>
      <Button onClick={handleLogout} colorScheme="red">
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
