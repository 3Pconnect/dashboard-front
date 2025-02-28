import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar
import { useEffect, useState } from "react";
import { fetchMembroById, registerApoiador, registerMembro, updateApoiador } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateNovoApoiadores = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("apoiador");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [atividade, setAtividade] = useState("");
  const [situacao, setSituacao] = useState("em_analise");
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const toast = useToast(); // Hook para o Toast
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async () => {
    setLoading(true); // Inicia o loading ao clicar no botão
    try {
      const response = await updateApoiador(
        Number(id),
        email,
        tipo_usuario,
        cargo,
        nome_empresa,
        cnpj,
        atividade
      );
      console.log("Membro registrado com sucesso", response);
      toast({
        title: "Usuário Cadastrado",
        description: "Usuário cadastrado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/main/apoiadores'); // Redireciona após o cadastro
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
          setCnpj(data?.cnpj)
          setEmail(data?.email)
          setNomeEmpresa(data?.nome_empresa)
          setCargo(data?.cargo)
          setAtividade(data?.area_atuacao	)
        } catch (error) {
          console.error(error);
        } finally {
          //setLoading(false);
        }
      };
      loadMembro();
    }, []);

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
              <BreadcrumbLink href="#">Novos Membros</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Atualizar Apoiador
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
            placeholder="Digite o nome do membro" 
            value={nome_empresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>E-mail</Text>
          <Input
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
            placeholder="Digite o CNPJ do membro"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Cargo</Text>
          <Input
         placeholder="Digite o cargo do membro"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Atividade</Text>
          <Input
  placeholder="Digite a atividade do membro"
            value={atividade}
            onChange={(e) => setAtividade(e.target.value)}
          />
        </Box>
      </Grid>

      {/* Campo Situação */}

      {/* Botão Salvar */}
      <VStack alignItems={"end"} mt={5}>
        <Button 
          colorScheme="green" 
          onClick={handleSubmit} 
          isLoading={loading} // Adiciona o estado de loading
          loadingText="Cadastrando..." // Texto de carregamento
        >
          Salvar
        </Button>
      </VStack>
    </>
  );
};
