import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, HStack } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar
import { useEffect, useState } from "react";
import { aprovarMembro, fetchMembroById, registerMembro, reprovarMembro, updateMembro } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { hasPermission } from "../utils/util";

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
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const toast = useToast(); // Hook para o Toast
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingAprovarReprovar, setLoadingAprovarReprovar] = useState(false);

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
          situacao
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
      navigate('/main/novos-membros'); // Redireciona após o cadastro
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
      setLoading(false); // Desativa o loading quando a requisição terminar
    }
  };

  useEffect(() => {

    const loadMembro = async () => {
      try {
        const data = await fetchMembroById(Number(id));
        console.log(data)
        setName(data?.name)
        setEmail(data?.email)
        setNomeEmpresa(data?.nome_empresa)
        setCargo(data?.cargo)
        setSituacao(data?.situacao)
        setBoschCarService(data?.bosch_car_service)
        setModuloDiagnosticoBosch(data?.modulo_diagnostico_bosch)
        setEquipamentoBosch(data?.equipamento_bosch)
        setAtendimentoCarrosPremium(data?.atendimento_carros_premium)
        setEmDiaComObrigacoes(data?.em_dia_com_obrigacoes)
        setAfiliacao(data?.afiliacao)
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    loadMembro();
  }, []);

  const handleAprovar = async () => {
    setLoadingAprovarReprovar(true)
    try {
      await aprovarMembro(Number(id));
      toast({
        title: 'Usuário aprovado',
        description: 'O usuário foi aprovado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/main/novos-membros');
      setLoadingAprovarReprovar(false)
      // fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível aprovar o usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoadingAprovarReprovar(false)
    }
  };

  const handleReprovar = async () => {
    setLoadingAprovarReprovar(true)
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
      setLoadingAprovarReprovar(false)
      // fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível reprovar o usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoadingAprovarReprovar(false)
    }
  };

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
              <BreadcrumbLink href="/cadastro">Cadastro</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Novos Membros</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Atualizar Novo Membro
        </Heading>
      </Flex>

      {/* Grid para os campos de Nome, E-mail, Empresa e Cargo */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo: 1 coluna em mobile e 2 em dispositivos maiores
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Nome</Text>
          <Input
            bg="white" color="black"
            placeholder="Digite o nome do membro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>E-mail</Text>
          <Input
            bg="white" color="black"
            placeholder="Digite o e-mail do membro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Empresa</Text>
          <Input
            bg="white" color="black"
            placeholder="Digite o nome da empresa"
            value={nome_empresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Cargo</Text>
          <Input
            bg="white" color="black"
            placeholder="Digite o cargo do membro"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </Box>
      </Grid>

      {/* Checklist com as informações estáticas */}
      <Box mt={5} bg={"gray.700"} borderRadius={3} p={3}>
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
      </Box>

      {/* Botão Salvar */}
      <VStack alignItems={"end"} mt={5}>
        <HStack>
          {hasPermission('aprovar_reprovar.membro') &&
            <>
              <Button
                colorScheme="red"
                loadingText="Cadastrando..." // Texto de carregamento
                onClick={handleReprovar}
                isLoading={loadingAprovarReprovar}
              >
                Recusar
              </Button>
              <Button
                colorScheme="green"
                onClick={handleAprovar}
                isLoading={loadingAprovarReprovar} // Adiciona o estado de loading
                loadingText="Cadastrando..." // Texto de carregamento
              >
                Aprovar
              </Button>
            </>
          }
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading} // Adiciona o estado de loading
            loadingText="Cadastrando..." // Texto de carregamento
          >
            Salvar
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

