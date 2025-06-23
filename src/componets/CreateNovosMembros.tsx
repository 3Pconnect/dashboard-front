import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, useBreakpointValue, Stack, Checkbox } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import { registerMembro } from "../services/api";
import { useNavigate } from "react-router-dom";
import { DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

const filterOptions = [
  { label: 'Ativo', value: 'ativo' },
  { label: 'Inativo', value: 'inativo' },
  { label: 'Em analise', value: 'em_analise' },
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
            value={atendimentoCarrosPremium}
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
            onChange={(e) => setAfiliadoEntidade(e.target.checked)}
          >
            Afiliado a Entidades, Sindicato ou Associação
          </Checkbox>
        </Grid>
      </Box>

      <Flex justify="flex-start" mt={5}>

        <Button
          mb={5}
          className="button-premium"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Salvando..."
          bg="#1b5ebc"
          color="white"
          colorScheme="green"
          w={{ base: "100%", md: "200px" }} // 100% no mobile, 200px no desktop
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>

      </Flex>
    </Box>
  );
};