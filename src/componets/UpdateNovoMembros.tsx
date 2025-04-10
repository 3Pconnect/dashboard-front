import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, HStack, useBreakpointValue } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import { aprovarMembro, fetchMembroById, updateMembro, reprovarMembro } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { hasPermission } from "../utils/util";
import { DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

const filterOptions = [
  { label: 'Ativo', value: 'ativo' },
  { label: 'Inativo', value: 'inativo' },
  { label: 'Em analise', value: 'em_analise' },
  { label: 'Pagamento Pendente', value: 'pagamento_pendente' },
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

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingAprovarReprovar, setLoadingAprovarReprovar] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [dataEvento, setDataEvento] = useState<Dayjs | null>(dayjs());
  const [filterType, setFilterType] = useState<string>('inativo');

  

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updateMembro(
        Number(id),
        {
          name,
          email,
          nome_empresa,
          cargo,
          situacao,
          vencimento: dataEvento
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

  useEffect(() => {
    const loadMembro = async () => {
      try {
        const data = await fetchMembroById(Number(id));
        console.log(data);
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
      // Aprova o membro
      await aprovarMembro(Number(id));

      // Atualiza o estado de gerouCobranca para true (indicando que a cobrança foi gerada)
      setGerouCobranca(true);

      toast({
        title: 'Usuário aprovado',
        description: 'O usuário foi aprovado e a cobrança foi gerada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/main/novos-membros');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível aprovar o usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
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
        title: 'Usuário reprovado',
        description: 'O usuário foi reprovado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/main/novos-membros');
      setLoadingAprovarReprovar(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível reprovar o usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoadingAprovarReprovar(false);
    }
  };

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
                <BreadcrumbLink href="/cadastro">Cadastro</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Novos Membros</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
        </Flex>
        <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" textAlign={{ base: 'left', md: 'right' }}>
          Atualizar Novo Membro
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Nome</Text>
          <Input
            className='button-premium'
            allowClear
            placeholder="Digite o nome do membro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px", borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>

        <Box mb={4}>
          <Text mb={2}>E-mail</Text>
          <Input
            className='button-premium'
            allowClear
            placeholder="Digite o e-mail do membro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px", borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Empresa</Text>
          <Input
            className='button-premium'
            allowClear
            placeholder="Digite o e-mail do membro"
            value={nome_empresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
            style={{
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px", borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>

        <Box mb={4}>
          <Text mb={2}>Cargo</Text>
          <Input
            className='button-premium'
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
          <Text mb={2}>Próximo Vencimento</Text>
          <DatePicker
          value={dataEvento}
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
        <Box>
          <Text mb={2}>Situação</Text>
          <Select
            className="button-premium"
            options={filterOptions}
            value={situacao}
            onChange={setSituacao}
            style={{
              width: 180,
              height: "40px",
              color: "white",
            }}
          />
        </Box>

      </Grid>

      <Box className='button-premium' mt={5} bg={"gray.700"} borderRadius={3} p={3}>
        <Heading fontSize="lg" mb={4}>Checklist</Heading>
        <VStack align="start" spacing={2}>
          <Text><strong>É Bosch Car Service:</strong> {bosch_car_service ? 'Sim' : 'Não'}</Text>
          <Text><strong>Módulo Diagnóstico Bosch:</strong> {modulo_diagnostico_bosch ? 'Sim' : 'Não'}</Text>
          <Text><strong>Possui Equipamento Bosch:</strong> {equipamento_bosch ? 'Sim' : 'Não'}</Text>
          <Text><strong>Atendimento Carros Premium:</strong> {atendimento_carros_premium || 'Não informado'}</Text>
          <Text><strong>Em Dia com Obrigações Federais, Estaduais e Municipais:</strong> {em_dia_com_obrigacoes ? 'Sim' : 'Não'}</Text>
          <Text><strong>Categoria da Empresa:</strong> {nome_empresa || 'Não informado'}</Text>
          <Text><strong>Afiliado a Entidades, Sindicato ou Associação:</strong> {afiliacao ? 'Sim' : 'Não'}</Text>
        </VStack>

        {/* Exibe a mensagem de que a cobrança foi gerada se o estado gerouCobranca for true */}
        {gerouCobranca && (
          <Text color="orange.400" mt={4}>
            As cobranças foram geradas e enviado para o email. O usuário será ativado após a confirmação do pagamento.
          </Text>
        )}
      </Box>

      <VStack className='button-premium' alignItems={"end"} mt={5}>
        <HStack>
          {hasPermission('aprovar_reprovar.membro') && (
            <>
              {!gerouCobranca && (
                <Button
                  colorScheme="red"
                  loadingText="Recusando..."
                  onClick={handleReprovar}
                  isLoading={loadingAprovarReprovar}
                >
                  Recusar
                </Button>
              )}
              <Button
                isDisabled={gerouCobranca} // Desabilita o botão se a cobrança foi gerada
                colorScheme="green"
                onClick={handleAprovar}
                isLoading={loadingAprovarReprovar}
                loadingText="Aprovando..."
              >
                {gerouCobranca ? "Aprovado e Fatura Gerada" : "Aprovar e Enviar Cobrança"}
              </Button>
            </>
          )}
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Salvando..."
          >
            Salvar
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
