import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar

export const CreateNovosMembros = () => {
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
              <BreadcrumbLink href="#">Novos Membros</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Cadastrar Novo Membro
        </Heading>
      </Flex>

      {/* Grid para os campos de Nome, E-mail, Empresa e Cargo */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo: 1 coluna em mobile e 2 em dispositivos maiores
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Nome</Text>
          <Input placeholder="Digite o nome do membro" />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>E-mail</Text>
          <Input placeholder="Digite o e-mail do membro" />
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Empresa</Text>
          <Input placeholder="Digite o nome da empresa" />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Cargo</Text>
          <Input placeholder="Digite o cargo do membro" />
        </Box>
      </Grid>

      {/* Campo Situação */}
      <Box mt={5}>
        <Text mb={2}>Situação</Text>
        <Select placeholder="Selecione a situação">
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="pendente">Pendente</option>
        </Select>
      </Box>

      {/* Botão Salvar */}
      <VStack alignItems={"end"} mt={5}>
        <Button colorScheme="green">Salvar</Button>
      </VStack>
    </>
  );
};
