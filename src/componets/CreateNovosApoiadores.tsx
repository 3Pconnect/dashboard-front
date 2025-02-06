import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar

export const CreateNovosApoiadores = () => {
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
              <BreadcrumbLink href="#">Novo Apoiador</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
           Novo Apoiador
        </Heading>
      </Flex>

      {/* Grid para os campos de Nome, CNPJ, E-mail, Telefone e Atividade */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo: 1 coluna em mobile e 2 em dispositivos maiores
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Nome</Text>
          <Input placeholder="Digite o nome do membro" />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>CNPJ</Text>
          <Input placeholder="Digite o CNPJ do membro" />
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>E-mail</Text>
          <Input placeholder="Digite o e-mail do membro" />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Telefone</Text>
          <Input placeholder="Digite o telefone do membro" />
        </Box>
      </Grid>

      {/* Campo Atividade */}
      <Box mt={5}>
        <Text mb={2}>Atividade</Text>
        <Input placeholder="Digite a atividade do membro" />
      </Box>

      {/* Botão Salvar */}
      <VStack alignItems={"end"} mt={5}>
        <Button colorScheme="green">Salvar</Button>
      </VStack>
    </>
  );
};
