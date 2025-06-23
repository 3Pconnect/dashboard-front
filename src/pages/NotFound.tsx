import { Box, Button, Text, VStack, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="#1A202C"  // Cor de fundo #1A202C
      p={4}
    >
      <VStack className="heading-title" spacing={6} textAlign="center" color="white">
        <Heading as="h1" size="4xl" color="teal.300">  {/* Cor do título */}
          404
        </Heading>
        <Text fontSize="xl" color="gray.300">
          Oops! A página que você está procurando não foi encontrada.
        </Text>
        <Button
          as={Link}
          to="/"
          colorScheme="teal"
          size="lg"
          variant="solid"
          mt={6}
          _hover={{ bg: "teal.500" }} // Cor de hover do botão
        >
          Voltar para a página inicial
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
