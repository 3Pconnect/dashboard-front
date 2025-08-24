import { 
  Button, Flex, Heading, Grid, Box, Text, Checkbox, useToast, useBreakpointValue 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { registerMembro } from "../services/api";
import { useNavigate } from "react-router-dom";
import { DatePicker, Input, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import dayjs, { Dayjs } from "dayjs";

const filterOptions = [
  { label: 'Ativo', value: 'ativo' },
  { label: 'Inativo', value: 'inativo' },
  { label: 'Em análise', value: 'em_analise' },
  { label: 'Pagamento Pendente', value: 'pagamento_pendente' },
];

interface Estado {
  sigla: string;
  nome: string;
}

export const CreateNovosMembros = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("");
  const [nivel, setNivel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [situacao, setSituacao] = useState("em_analise");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [filterType, setFilterType] = useState<string>('inativo');
  const navigate = useNavigate();

  const [bosch_car_service, setBoschCarService] = useState(false);
  const [modulo_diagnostico_bosch, setModuloDiagnosticoBosch] = useState(false);
  const [equipamento_bosch, setEquipamentoBosch] = useState(false);
  const [em_dia_com_obrigacoes, setEmDiaComObrigacoes] = useState(false);
  const [afiliacao, setAfiliadoEntidade] = useState(false);
  const [atendimentoCarrosPremium, setAtendimentoCarrosPremium] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [site, setSite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [dataEvento, setDataEvento] = useState<Dayjs | null>(dayjs());

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
      const response = await registerMembro(
        {
          name,
          email,
          tipo_usuario,
          telefone,
          nome_empresa,
          cargo,
          cnpj,
          dataEvento,
          atendimento_carros_premium: atendimentoCarrosPremium,
          bosch_car_service,
          modulo_diagnostico_bosch,
          equipamento_bosch,
          em_dia_com_obrigacoes,
          afiliacao,
          site,
          instagram,
          estado: estadoSelecionado,
          nivel
        }
      );
      console.log("Membro registrado com sucesso", response);
      toast({
        title: "Usuário Cadastrado",
        description: "Usuário cadastrado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/main/novos-membros');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o usuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erro ao registrar membro", error);
    } finally {
      setLoading(false);
    }
  };

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"auto"} p={4}>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading className="heading-title" fontSize="2xl" fontWeight="bold">
          Criar Membro
        </Heading>
      </Flex>

      <Grid className="indicator-title" templateColumns={gridTemplateColumns} gap={4}>
        {/* Nome */}
        <Box mb={4}>
          <Text className="indicator-title" mb={2}>Nome</Text>
          <Input
            allowClear
            placeholder="Digite o nome do membro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mecanicos-input"
          />
        </Box>

        {/* Email */}
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

        {/* Empresa */}
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

        {/* Cargo */}
        <Box mb={4}>
          <Text mb={2}>Cargo</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o cargo do membro"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </Box>

        {/* Site */}
        <Box>
          <Text mb={2}>Site</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite a url do site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
        </Box>

        {/* Instagram */}
        <Box>
          <Text mb={2}>Instagram</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o @"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Box>

        {/* Nível */}
        <Box w="100%">
          <Text mb={2}>Nível</Text>
          <Select
            className="button-premium"
            style={{ width: "100%" }}
            value={nivel}
            onChange={(value) => setNivel(value as string)}
          >
            <Select.Option value="junior">Junior</Select.Option>
            <Select.Option value="associado">Associado</Select.Option>
          </Select>
        </Box>

        {/* CNPJ com máscara */}
        <Box className="indicator-title" mb={4}>
          <Text mb={2}>CNPJ</Text>
          <MaskedInput
            mask="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="Digite o CNPJ aqui"
            className="mecanicos-input"
            style={{ width: "100%" }}
          />
        </Box>

        {/* Data */}
        <Box>
          <Text mb={2}>Próximo Vencimento</Text>
          <DatePicker
            value={dataEvento}
            className="mecanicos-input"
            style={{ width: "100%" }}
            onChange={(date) => setDataEvento(date)}
          />
        </Box>

        {/* Atendimento Premium */}
        <Box w="100%">
          <Text mb={2}>Atendimento Premium</Text>
          <Select
            className="button-premium"
            style={{ width: "100%" }}
            value={atendimentoCarrosPremium}
            onChange={(value) => setAtendimentoCarrosPremium(value as string)}
          >
            <Select.Option value="0a20">De 0 a 20%</Select.Option>
            <Select.Option value="20a40">De 20 a 40%</Select.Option>
            <Select.Option value="40a60">De 40 a 60%</Select.Option>
            <Select.Option value="acima80">Acima de 80%</Select.Option>
          </Select>
        </Box>

        {/* Categoria */}
        <Box w="100%">
          <Text mb={2}>Categoria da Empresa</Text>
          <Select
            className="button-premium"
            style={{ width: "100%" }}
            value={categoria}
            onChange={(value) => setCategoria(value as string)}
          >
            <Select.Option value="simples_nacional">Simples Nacional</Select.Option>
            <Select.Option value="lucro_presumido">Lucro Presumido</Select.Option>
            <Select.Option value="lucro_real">Lucro Real</Select.Option>
          </Select>
        </Box>

        {/* Situação */}
        <Box w="100%">
          <Text mb={2}>Situação</Text>
          <Select
            className="button-premium"
            options={filterOptions}
            value={filterType}
            onChange={setFilterType}
            style={{ width: "100%" }}
          />
        </Box>

        {/* Estados com search */}
     <Box mb={4}>
  <Text mb={2}>Estados</Text>
  <Select
    showSearch
    className="button-premium"
    style={{
      width: "100%",
      height: "40px",
      color: "white",
    }}
    placeholder="Selecione o estado"
    value={estadoSelecionado}
    onChange={(value) => setEstadoSelecionado(value)}
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
    options={estados.map((estado) => ({
      label: `${estado.sigla} - ${estado.nome}`,
      value: estado.sigla,
    }))}
  />
</Box>

      </Grid>

      {/* Checkboxes */}
      <Box mt={6} mb={6} color={"black"} className="indicator-title">
        <Text fontWeight="semibold" mb={3}>
          Avaliação de Requisitos para novo Associado
        </Text>
        <Grid pl={4} templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} rowGap={2} columnGap={4}>
          <Checkbox isChecked={bosch_car_service} onChange={(e) => setBoschCarService(e.target.checked)}>
            É Bosch Car Service
          </Checkbox>
          <Checkbox isChecked={modulo_diagnostico_bosch} onChange={(e) => setModuloDiagnosticoBosch(e.target.checked)}>
            Módulo de Diagnóstico Bosch
          </Checkbox>
          <Checkbox isChecked={equipamento_bosch} onChange={(e) => setEquipamentoBosch(e.target.checked)}>
            Possui Equipamento Bosch
          </Checkbox>
          <Checkbox isChecked={em_dia_com_obrigacoes} onChange={(e) => setEmDiaComObrigacoes(e.target.checked)}>
            Em Dia com Obrigações Federais, Estaduais e Municipais
          </Checkbox>
          <Checkbox isChecked={afiliacao} onChange={(e) => setAfiliadoEntidade(e.target.checked)}>
            Afiliado a Entidades, Sindicato ou Associação
          </Checkbox>
        </Grid>
      </Box>

      {/* Botão */}
      <Flex justify="flex-start" mt={5}>
        <Button
          mb={5}
          className="button-premium"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Salvando..."
          bg="#1b5ebc"
          color="white"
          w={{ base: "100%", md: "200px" }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Flex>
    </Box>
  );
};
