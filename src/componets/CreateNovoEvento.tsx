import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, useBreakpointValue } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import { Dayjs } from "dayjs";
import { registerEvento } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

export const CreateNovoEvento = () => {
  const toast = useToast();
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [nomeEvento, setNomeEvento] = useState<string>("");
  const [temaEvento, setTemaEvento] = useState<string>("");
  const [situacao, setSituacao] = useState<string>("inativo");
  const [dataEvento, setDataEvento] = useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const carregarEstados = async () => {
    try {
      const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error("Erro ao carregar os estados:", error);
    }
  };

  const carregarCidades = async (uf: string) => {
    if (!uf) return;
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      const data = await response.json();
      setCidades(data);
    } catch (error) {
      console.error("Erro ao carregar as cidades:", error);
    }
  };

  useEffect(() => {
    carregarEstados();
  }, []);

  useEffect(() => {
    carregarCidades(estadoSelecionado);
  }, [estadoSelecionado]);

  const handleSalvar = async () => {
    setIsLoading(true);
    try {
      await registerEvento(
        nomeEvento,
        cidadeSelecionada,
        estadoSelecionado,
        temaEvento,
        situacao,
        dataEvento ? dataEvento.format("YYYY-MM-DD") : ""
      );

      toast({
        title: "Evento registrado.",
        description: "O evento foi registrado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/main/agenda-eventos');
    } catch (error) {
      toast({
        title: "Erro ao registrar evento.",
        description: "Algo deu errado.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterOptions = [
    { label: 'Ativo', value: 'ativo' },
    { label: 'Inativo', value: 'inativo' },
    { label: 'Pendente', value: 'pendente' },
  ];

  return (
    <>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" mb={10}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" mb={{ base: 2, md: 0 }}>
          <Button
            colorScheme="white"
            variant="ghost"
            leftIcon={<Icon as={MdArrowBack} />}
            mr={{ base: 0, md: 4 }}
            mb={{ base: 2, md: 0 }}
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
          {!isMobile && (
            <Breadcrumb display={{ base: 'none', md: 'flex' }}>
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
          )}
        </Flex>
        <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" textAlign={{ base: 'left', md: 'right' }}>
          Agendar Evento
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Nome do Evento</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite o nome do evento"
            value={nomeEvento}
            onChange={(e) => setNomeEvento(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
        <Box mb={4}>
          <Text mb={2}>Estados</Text>
          <Select
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            placeholder="Selecione o estado"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e)}
          >
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.sigla} - {estado.nome}
              </option>
            ))}
          </Select>
        </Box>
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Cidade</Text>
          <Select
            placeholder="Selecione a cidade"
            value={cidadeSelecionada}
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            onChange={(value) => setCidadeSelecionada(value as string)}
          >
            {cidades.map((cidade) => (
              <Select.Option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </Select.Option>
            ))}
          </Select>
        </Box>

        <Box mb={4}>
          <Text mb={2}>Tema</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite o tema do evento"
            value={temaEvento}
            onChange={(e) => setTemaEvento(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
      </Grid>

      <Box mt={5}>
        <Text mb={2}>Data do Evento</Text>
        <DatePicker
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "0px",
            borderColor: "#2596be",
            borderWidth: "1px",
            "::placeholder": {
              color: "white",
            },
          } as any}
          inputReadOnly={false}
          onChange={(date) => setDataEvento(date)}
        />
      </Box>

      <Box mt={5}>
        <Text mb={2}>Situação</Text>
        <Select
          className="button-premium"
          style={{
            width: "100%",
            height: "40px",
            color: "white",
          }}
          options={filterOptions}
          value={situacao}
          onChange={(value) => setSituacao(value as string)}
        />
      </Box>

      <VStack alignItems={"end"} mt={5}>
        <Button
          colorScheme="green"
          isLoading={isLoading}
          onClick={handleSalvar}
        >
          Salvar
        </Button>
      </VStack>
    </>
  );
};