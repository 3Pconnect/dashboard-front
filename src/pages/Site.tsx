import { Box, Flex, Image, Button, Heading, Text, Input, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import '../../src/css/css.css'

const HeaderComponent = () => {
  // Para alternar o display do menu em telas menores
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="#040c18" color="white" minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={4}>
      {/* Navegação */}
      <Flex
      borderBottom="1px solid white" 
      bg={"#182443"}
        as="nav"
        w="100%"
        py={5}
        px={{ base: 4, md: 40 }} // Responsivo: menos padding em telas menores
        justify="space-between"
        align="center"
        position="absolute"
        top={0}
        left={0}
        right={0}
      >
        <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo" boxSize="50px" />

        {/* Se for mobile, mostra o botão de menu; se não, mostra os links */}
        {isMobile ? (
          <Button colorScheme="white" variant="link" mr={4}>Menu</Button>
        ) : (
          <Flex fontFamily={"Roboto, sans-serif"}>
            <Button colorScheme="white" variant="link" mr={4}>Home</Button>
            <Button colorScheme="white" variant="link" mr={4}>Sobre nós</Button>
            <Button colorScheme="white" variant="link" mr={4}>Eventos</Button>
            <Button colorScheme="white" variant="link" mr={4}>Fale Conosco</Button>
            <Button colorScheme="white" variant="link" mr={4}>Galeria de Fotos</Button>
            <Button  fontWeight={'normal'} colorScheme="red" variant="solid" mr={4}>Quero ser Membro</Button>
            <Button  fontWeight={'normal'} colorScheme="blue" variant="solid">Login</Button>
          </Flex>
        )}
      </Flex>

      {/* Conteúdo Principal */}
      <Box w={{ base: "90%", sm: "70%", md: "50%" }} textAlign="center" py={16}>
        <Heading
          as="h1"
          size="3xl"
          mb={4}
          fontFamily={"Roboto, sans-serif"}
          background="linear-gradient(to right, #357398, #91A5B1)"
          backgroundClip="text"
          color="transparent"
        >
          ASSOCIAÇÃO DOS MECÂNICOS PREMIUM BRASIL
        </Heading>
        <Text fontFamily={"Roboto, sans-serif"} color={"rgb(129, 175, 221)"} fontSize={{ base: "sm", md: "md" }} mb={8} maxWidth="600px" mx="auto">
          Bem-vindo à Associação dos Mecânicos Premium Brasil! Somos uma comunidade exclusiva de profissionais altamente qualificados e dedicados a fornecer serviços automotivos de alta qualidade.
        </Text>

        {/* Seção de Input de E-mail */}
        <HStack spacing={4} justify="center">
          <Input
          fontFamily={"Roboto, sans-serif"}
            placeholder="Digite seu email"
            size="lg"
            width="full"
            maxWidth="400px"
            bg="#052d56"
            color="#052d56"
            borderColor="#031f3a"
            focusBorderColor="#031f3a"
            fontWeight={'normal'}
          />
          <Button
          fontFamily={"Roboto, sans-serif"}
            colorScheme="red"
            fontWeight={'normal'}
            size="lg"
            width={{ base: "full", md: "auto" }} // Ajusta a largura do botão em telas pequenas
            maxWidth="250px"
          >
            Quero ser Premium
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default HeaderComponent;
