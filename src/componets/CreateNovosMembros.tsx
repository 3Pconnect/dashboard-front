import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar
import { useState } from "react";
import { registerMembro } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";


const filterOptions = [
  { label: 'Ativo', value: 'ativo' },
  { label: 'Inativo', value: 'inativo' },
  { label: 'Pendente', value: 'pendente' },
];

export const CreateNovosMembros = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [situacao, setSituacao] = useState("em_analise");
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const toast = useToast(); // Hook para o Toast
  const [filterType, setFilterType] = useState<string>('inativo');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true); // Inicia o loading ao clicar no botão
    try {
      const response = await registerMembro(
        name,
        email,
        tipo_usuario,
        telefone,
        nome_empresa,
        cargo,
        cnpj,
        filterType
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
          Cadastrar Novo Membro
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
            className='button-premium'
            allowClear
            placeholder="Digite o nome do membri"
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

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
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

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
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

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
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
      </Grid>

      {/* Campo Situação */}
      <Box mt={5}>
        <Text mb={2}>Situação</Text>
       
        <Select
  className="button-premium"
  options={filterOptions}
  value={filterType}
  onChange={setFilterType}
  style={{
    width: 180, 
    height: "40px", 
    color: "white",  // Cor do texto (opcional, para contrastar com o fundo)
  }}
/>
      </Box>

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
