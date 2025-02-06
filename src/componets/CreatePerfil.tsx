import { Button, Flex, Heading, Input, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar

export const CreatePerfil = () => {
  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Flex align="center">
          {/* Botão de Voltar */}
          <Button
            variant="ghost"
            leftIcon={<Icon as={MdArrowBack} />}
            mr={4}
            onClick={() => window.history.back()} // Vai para a página anterior
          >
            Voltar
          </Button>

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/cadastro">Cadastro</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Perfil</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Cadastrar Perfil
        </Heading>
      </Flex>

      <Box mb={6}>
        <Text mb={2}>Nome do Perfil</Text>
        <Input placeholder="Digite o nome do perfil" />
      </Box>

      <VStack alignItems={"end"}>
        <Button colorScheme="green">Salvar</Button>
      </VStack>
    </>
  );
};
