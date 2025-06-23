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
  StackDirection,
  Checkbox
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

interface Estado {
  sigla: string;
  nome: string;
}

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
  const [loadingMembro, setLoadingMembro] = useState(false);
  const [gerouCobranca, setGerouCobranca] = useState(false);
  const [site, setSite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [filterType, setFilterType] = useState<string>('inativo');
  const [categoria, setCategoria] = useState("");


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
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [nivel, setNivel] = useState("");

  const carregarEstados = async () => {
    try {
      const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error("Erro ao carregar os estados:", error);
    }
  };


  useEffect(() => {
    carregarEstados();
  }, []);


  const handleSubmit = async () => {

    setLoading(true);
    try {
      const response = await updateMembro(Number(id), {
        name,
        email,
        tipo_usuario,
        telefone,
        nome_empresa,
        cargo,
        cnpj,
        situacao,
        dataEvento,
        atendimento_carros_premium: atendimento_carros_premium,
        bosch_car_service,
        modulo_diagnostico_bosch,
        equipamento_bosch,
        em_dia_com_obrigacoes,
        afiliacao,
        site,
        instagram,
        vencimento: dataEvento,
        estado: estadoSelecionado,
        categoria_empresa: categoria,
        nivel
      });
    console.log(response.data)
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
      setLoadingMembro(true)
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
        setInstagram(data?.instagram)
        setSite(data?.site)
        setCnpj(data?.cnpj)
        setLoadingMembro(false)
        setEstadoSelecionado(data?.estado)
        setCategoria(data?.categoria_empresa)
        setNivel(data?.nivel)
      } catch (error) {
        setLoadingMembro(false)
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

    const gridTemplateColumns = useBreakpointValue({
      base: "1fr",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    });
  

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4}>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading className="heading-title" fontSize="2xl" fontWeight="bold">
          Editar Membro
        </Heading>
      </Flex>

      <Grid className="indicator-title" templateColumns={gridTemplateColumns} gap={4}>
        <Box mb={4}>
          <Text className="indicator-title" mb={2}>Nome</Text>
          <Input
            allowClear
            placeholder="Digite o nome do membri"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mecanicos-input"
          />
        </Box>


        <Box mb={4}>
          <Text mb={2}>E-mail</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o e-mail do membro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box mb={4}>
          <Text mb={2}>Empresa</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o nome da empresa"
            value={nome_empresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
          />
        </Box>

        <Box mb={4}>
          <Text mb={2}>Cargo</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o cargo do membro"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px", borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>

        <Box>
          <Text mb={2}>Site</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite a url do site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px",
            }}
          />
        </Box>

        <Box>
          <Text mb={2}>Instagram</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o @"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px",
            }}
          />
        </Box>

        <Box mb={[0, 0]} w="100%">
          <Text mb={2}>Nível</Text>
          <Select
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            value={nivel}
            onChange={(value) => setNivel(value as string)}
          >
            <option value="junior">Junior</option>
            <option value="associado">Associado</option>
          </Select>
        </Box>

        <Box className="indicator-title" mb={4}>
          <Text mb={2}>CNPJ</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o cnpj aqui"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px", borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>

        <Box>
          <Text mb={2}>Próximo Vencimento</Text>
          <DatePicker
            value={dataEvento}
            className="mecanicos-input"
            inputReadOnly={false}
            style={{ width: "100%" }}
            onChange={(date) => setDataEvento(date)}
          />
        </Box>

        <Box mb={[4, 0]} w="100%">
          <Text mb={2}>Atendimento Premium</Text>
          <Select
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            value={atendimento_carros_premium}
            onChange={(value) => setAtendimentoCarrosPremium(value as string)}
          >
            <option value="0a20">De 0 a 20%</option>
            <option value="20a40">De 20 a 40%</option>
            <option value="40a60">De 40 a 60%</option>
            <option value="acima80">Acima de 80%</option>
          </Select>
        </Box>

        <Box mb={[0, 0]} w="100%">
          <Text mb={2}>Categoria da Empresa</Text>
          <Select
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            value={categoria}
            onChange={(value) => setCategoria(value as string)}
          >
            <option value="simples_nacional">Simples Nacional</option>
            <option value="lucro_presumido">Lucro Presumido</option>
            <option value="lucro_real">Lucro Real</option>
          </Select>
        </Box>

        <Box w="100%">
          <Text mb={2}>Situação</Text>
          <Select
            className="button-premium"
            options={filterOptions}
            value={filterType}
            onChange={setFilterType}
            style={{
              width: "100%",
              height: "40px",
              color: "white",
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


      <Box mt={6} mb={6} color={"black"} className="indicator-title">
        <Text fontWeight="semibold" mb={3}>
          Avaliação de Requisitos para novo Associado
        </Text>
        <Grid pl={4} templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} rowGap={2} columnGap={4}>
          <Checkbox
            isChecked={bosch_car_service}
            onChange={(e) => setBoschCarService(e.target.checked)}
          >
            É Bosch Car Service
          </Checkbox>

          <Checkbox
            colorScheme="gray"
            isChecked={modulo_diagnostico_bosch}
            onChange={(e) => setModuloDiagnosticoBosch(e.target.checked)}
          >
            Módulo de Diagnóstico Bosch
          </Checkbox>

          <Checkbox
            colorScheme="gray"
            isChecked={equipamento_bosch}
            onChange={(e) => setEquipamentoBosch(e.target.checked)}
          >
            Possui Equipamento Bosch
          </Checkbox>

          <Checkbox
            colorScheme="gray"
            isChecked={em_dia_com_obrigacoes}
            onChange={(e) => setEmDiaComObrigacoes(e.target.checked)}
          >
            Em Dia com Obrigações Federais, Estaduais e Municipais
          </Checkbox>

          <Checkbox
            colorScheme="gray"
            isChecked={afiliacao}
            onChange={(e) => { setAfiliacao(e.target.checked) }}
          >
            Afiliado a Entidades, Sindicato ou Associação
          </Checkbox>
        </Grid>
      </Box>
      {/* 
      <Box mt={5}>
        <Heading fontSize="lg" mb={4}>Checklist</Heading>
        <Table columns={checklistColumns} dataSource={checklistData} pagination={false} bordered size="middle" />

        {gerouCobranca && (
          <Text color="orange.400" mt={4}>
            As cobranças foram geradas e enviadas para o e-mail. O usuário será ativado após a confirmação do pagamento.
          </Text>
        )}
      </Box> */}


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
