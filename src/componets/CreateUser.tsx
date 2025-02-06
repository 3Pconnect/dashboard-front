import { Button, Flex, Heading, Input, Grid, Box, Text, Checkbox, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar

export const CreateUser = () => {
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
              <BreadcrumbLink href="#">Usuários</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Cadastrar Usuário
        </Heading>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo: 1 coluna em mobile e 2 em dispositivos maiores
        gap={4}
      >
        <Box>
          <Text mb={2}>Nome</Text>
          <Input placeholder="Digite seu nome" />
        </Box>

        <Box>
          <Text mb={2}>E-mail</Text>
          <Input placeholder="Digite seu e-mail" />
        </Box>
      </Grid>

      <VStack mt={5} spacing={4} align="stretch">
        <Box>
          <Text mb={2}>Situação do Usuário</Text>
          <Select placeholder="Selecione a situação">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="pendente">Pendente</option>
          </Select>
        </Box>
      </VStack>

      <VStack mt={5} alignItems={"start"}>
        <Text mb={2}>Perfil de Acesso</Text>
        <Checkbox>Administrador</Checkbox>
        <Checkbox>Editor</Checkbox>
        <Checkbox>Leitor</Checkbox>
      </VStack>

      <VStack alignItems={"end"}>
        <Button colorScheme="green">Salvar</Button>
      </VStack>
    </>
  );
};
