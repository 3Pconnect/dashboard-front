import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar
import { useState, useEffect } from "react"; // Importando useState e useEffect
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

// Tipos para os dados das respostas da API
interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

export const CreateNovoEvento = () => {
  // Estados para armazenar dados de estados e cidades
  const [estados, setEstados] = useState<Estado[]>([]); // Tipando como um array de Estado
  const [cidades, setCidades] = useState<Cidade[]>([]); // Tipando como um array de Cidade
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  // Função para carregar os estados do IBGE
  const carregarEstados = async () => {
    try {
      const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const data = await response.json();
      setEstados(data); // Preenche o estado com a resposta da API
    } catch (error) {
      console.error("Erro ao carregar os estados:", error);
    }
  };

  // Função para carregar as cidades de um estado específico
  const carregarCidades = async (uf: string) => {
    if (!uf) return; // Se o estado não for selecionado, não faz nada
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      const data = await response.json();
      setCidades(data); // Preenche a lista de cidades
    } catch (error) {
      console.error("Erro ao carregar as cidades:", error);
    }
  };

  // Carregar estados ao montar o componente
  useEffect(() => {
    carregarEstados();
  }, []);

  // Quando o estado é selecionado, carrega as cidades correspondentes
  useEffect(() => {
    carregarCidades(estadoSelecionado);
  }, [estadoSelecionado]);

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Flex align="center">
          {/* Botão de Voltar */}
          <Button
            colorScheme="white"
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
          <Input color={"black"} bg={"white"} placeholder="Digite o nome do evento" />
        </Box>
       <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Estados</Text>
          <Select
            color={"black"}
            bg={"white"}
            placeholder="Selecione o estado"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          >
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.sigla} - {estado.nome}
              </option>
            ))}
          </Select>
        </Box>
     
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
    <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Cidade</Text>
          <Select
            color={"black"}
            bg={"white"}
            placeholder="Selecione a cidade"
            value={cidadeSelecionada}
            onChange={(e) => setCidadeSelecionada(e.target.value)}
          >
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </Select>
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Tema</Text>
          <Input color={"black"} bg={"white"} placeholder="Digite o tema do evento" />
        </Box>
      </Grid>

      {/* Campo Data */}
      <Box mt={5}>
        <Text mb={2}>Data</Text>
        <DatePicker
    style={{ width: "100%", height: "40px" }}
  />
      </Box>

      {/* Campo Situação */}
      <Box mt={5}>
        <Text mb={2}>Situação</Text>
        <Select color={"black"} bg={"white"} placeholder="Selecione a situação">
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
