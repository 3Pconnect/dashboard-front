import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar

export const CreateNovoEvento = () => {
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
              <BreadcrumbLink href="/agenda">Agenda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Eventos</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Agendar Evento
        </Heading>
      </Flex>

      {/* Grid para os campos de Nome do Evento, Cidade, Estado, Tema */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo: 1 coluna em mobile e 2 em dispositivos maiores
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Nome do Evento</Text>
          <Input placeholder="Digite o nome do evento" />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Cidade</Text>
          <Input placeholder="Digite a cidade do evento" />
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Estado</Text>
          <Input placeholder="Digite o estado do evento" />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Tema</Text>
          <Input placeholder="Digite o tema do evento" />
        </Box>
      </Grid>

      {/* Campo Data */}
      <Box mt={5}>
        <Text mb={2}>Data</Text>
        <Input type="date" placeholder="Selecione a data do evento" />
      </Box>

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
