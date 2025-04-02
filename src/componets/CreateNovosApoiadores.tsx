import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, useBreakpointValue } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
import { registerApoiador } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

export const CreateNovosApoiadores = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("apoiador");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [atividade, setAtividade] = useState("");
  const [situacao, setSituacao] = useState("em_analise");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await registerApoiador(
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
      navigate('/main/apoiadores');
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
          Cadastrar Novo Apoiador
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Nome</Text>
          <Input
            className='button-premium'
            allowClear
            placeholder="Digite o nome do membro"
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
            placeholder="Digite o CNPJ do membro"
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

        <Box mb={4}>
          <Text mb={2}>Cargo</Text>
          <Input
            className='button-premium'
            allowClear
            placeholder="Digite o telefone do membro"
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

        <Box mb={4}>
          <Text mb={2}>Atividade</Text>
          <Input
            className='button-premium'
            allowClear
            placeholder="Digite a atividade do membro"
            value={atividade}
            onChange={(e) => setAtividade(e.target.value)}
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

      <VStack alignItems={"end"} mt={5}>
        <Button
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Cadastrando..."
        >
          Salvar
        </Button>
      </VStack>
    </>
  );
};