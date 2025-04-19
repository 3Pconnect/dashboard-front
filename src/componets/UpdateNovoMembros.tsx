import {
  Button,
  Flex,
  Heading,
  Grid,
  Box,
  Text,
  VStack,
  useToast,
  HStack,
  useBreakpointValue,
  Stack,
  StackDirection
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  aprovarMembro,
  fetchMembroById,
  updateMembro,
  reprovarMembro
} from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { hasPermission } from "../utils/util";
import { DatePicker, Input, Select, Table, Tag } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const filterOptions = [
  { label: "Ativo", value: "ativo" },
  { label: "Inativo", value: "inativo" },
  { label: "Em analise", value: "em_analise" },
  { label: "Pagamento Pendente", value: "pagamento_pendente" }
];

export const UpdateNovoMembros = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [situacao, setSituacao] = useState("em_analise");
  const [bosch_car_service, setBoschCarService] = useState(false);
  const [modulo_diagnostico_bosch, setModuloDiagnosticoBosch] = useState(false);
  const [equipamento_bosch, setEquipamentoBosch] = useState(false);
  const [atendimento_carros_premium, setAtendimentoCarrosPremium] = useState("");
  const [em_dia_com_obrigacoes, setEmDiaComObrigacoes] = useState(false);
  const [afiliacao, setAfiliacao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gerouCobranca, setGerouCobranca] = useState(false);

  const buttonDirection = useBreakpointValue<StackDirection>({
    base: "column",
    md: "row",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingAprovarReprovar, setLoadingAprovarReprovar] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [dataEvento, setDataEvento] = useState<Dayjs | null>(dayjs());

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updateMembro(Number(id), {
        name,
        email,
        nome_empresa,
        cargo,
        situacao,
        vencimento: dataEvento
      });

      toast({
        title: "Usuário Cadastrado",
        description: "Usuário cadastrado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      navigate("/main/novos-membros");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o usuário.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMembro = async () => {
      try {
        const data = await fetchMembroById(Number(id));
        setName(data?.name);
        setEmail(data?.email);
        setNomeEmpresa(data?.nome_empresa);
        setCargo(data?.cargo);
        setSituacao(data?.situacao);
        setBoschCarService(data?.bosch_car_service);
        setModuloDiagnosticoBosch(data?.modulo_diagnostico_bosch);
        setEquipamentoBosch(data?.equipamento_bosch);
        setAtendimentoCarrosPremium(data?.atendimento_carros_premium);
        setEmDiaComObrigacoes(data?.em_dia_com_obrigacoes);
        setAfiliacao(data?.afiliacao);
        setGerouCobranca(data?.gerouCobranca);
      } catch (error) {
        console.error(error);
      }
    };
    loadMembro();
  }, [id]);

  const handleAprovar = async () => {
    setLoadingAprovarReprovar(true);
    try {
      await aprovarMembro(Number(id));
      setGerouCobranca(true);
      toast({
        title: "Usuário aprovado",
        description: "O usuário foi aprovado e a cobrança foi gerada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      navigate("/main/novos-membros");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível aprovar o usuário.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoadingAprovarReprovar(false);
    }
  };

  const handleReprovar = async () => {
    setLoadingAprovarReprovar(true);
    try {
      await reprovarMembro(Number(id));
      toast({
        title: "Usuário reprovado",
        description: "O usuário foi reprovado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      navigate("/main/novos-membros");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível reprovar o usuário.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoadingAprovarReprovar(false);
    }
  };

  const checklistData = [
    { key: "1", item: "É Bosch Car Service", value: bosch_car_service ? "Sim" : "Não" },
    { key: "2", item: "Módulo Diagnóstico Bosch", value: modulo_diagnostico_bosch ? "Sim" : "Não" },
    { key: "3", item: "Possui Equipamento Bosch", value: equipamento_bosch ? "Sim" : "Não" },
    { key: "4", item: "Atendimento Carros Premium", value: atendimento_carros_premium ? "Sim" : "Não" },
    { key: "5", item: "Em Dia com Obrigações Federais, Estaduais e Municipais", value: em_dia_com_obrigacoes ? "Sim" : "Não" },
    { key: "6", item: "Categoria da Empresa", value: nome_empresa || "Não informado" },
    { key: "7", item: "Afiliado a Entidades, Sindicato ou Associação", value: afiliacao ? "Sim" : "Não" }
  ];

  const checklistColumns = [
    { title: "Item", dataIndex: "item", key: "item" },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      render: (value: string) => {
        let color = "default";

        if (value === "Sim") color = "green";
        else if (value === "Não") color = "red";
        else color = "blue";

        return (
          <Tag color={color}>{value}</Tag>
        );
      }
    }
  ];

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4}>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading className="heading-title" fontSize="2xl" fontWeight="bold">
          Editar Membro
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Nome</Text>
          <Input className="mecanicos-input" value={name} onChange={(e) => setName(e.target.value)} allowClear />
        </Box>

        <Box mb={4}>
          <Text mb={2}>E-mail</Text>
          <Input className="mecanicos-input" value={email} onChange={(e) => setEmail(e.target.value)} allowClear />
        </Box>

        <Box mb={4}>
          <Text mb={2}>Empresa</Text>
          <Input className="mecanicos-input" value={nome_empresa} onChange={(e) => setNomeEmpresa(e.target.value)} allowClear />
        </Box>

        <Box mb={4}>
          <Text mb={2}>Cargo</Text>
          <Input className="mecanicos-input" value={cargo} onChange={(e) => setCargo(e.target.value)} allowClear />
        </Box>

        <Box>
          <Text mb={2}>Próximo Vencimento</Text>
          <DatePicker
            className="mecanicos-input"
            value={dataEvento}
            style={{ width: "100%" }}
            onChange={(date) => setDataEvento(date)}
          />
        </Box>

        <Box w={"100%"}>
          <Text mb={2}>Situação</Text>
          <Select
            className="button-premium"
            options={filterOptions}
            value={situacao}
            onChange={setSituacao}
            style={{
              width: "100%",
              height: "40px",
              color: "white"
            }}
          />
        </Box>
      </Grid>

      <Box mt={5}>
        <Heading fontSize="lg" mb={4}>Checklist</Heading>
        <Table columns={checklistColumns} dataSource={checklistData} pagination={false} bordered size="middle" />

        {gerouCobranca && (
          <Text color="orange.400" mt={4}>
            As cobranças foram geradas e enviadas para o e-mail. O usuário será ativado após a confirmação do pagamento.
          </Text>
        )}
      </Box>


      <Flex justify="flex-start" mt={5}>

      <Stack direction={buttonDirection} spacing={3} w="100%" align={isMobile ? "stretch" : "end"}>
  {hasPermission("aprovar_reprovar.membro") && (
    <>
      {!gerouCobranca && (
        <Button
          className="button-premium"
          colorScheme="red"
          loadingText="Recusando..."
          onClick={handleReprovar}
          isLoading={loadingAprovarReprovar}
          w={isMobile ? "100%" : "auto"}
        >
          Recusar
        </Button>
      )}
      <Button
        className="button-premium"
        isDisabled={gerouCobranca}
        colorScheme="green"
        onClick={handleAprovar}
        isLoading={loadingAprovarReprovar}
        loadingText="Aprovando..."
        w={isMobile ? "100%" : "auto"}
      >
        {gerouCobranca ? "Aprovado e Fatura Gerada" : "Aprovar e Enviar Cobrança"}
      </Button>
    </>
  )}
  <Button
    className="button-premium"
    colorScheme="blue"
    onClick={handleSubmit}
    isLoading={loading}
    loadingText="Salvando..."
    w={isMobile ? "100%" : "auto"}
  >
    Salvar
  </Button>
</Stack>
      </Flex>
    </Box>
  );
};
