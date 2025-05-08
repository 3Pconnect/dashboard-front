import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, useBreakpointValue } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchMembroById, updateApoiador } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Select } from "antd";

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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updateApoiador(
        Number(id),
        email,
        tipo_usuario,
        cargo,
        nome_empresa,
        cnpj,
        atividade,
        "nivel_default"
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

  useEffect(() => {
    const loadMembro = async () => {
      try {
        const data = await fetchMembroById(Number(id));
        setCnpj(data?.cnpj);
        setEmail(data?.email);
        setNomeEmpresa(data?.nome_empresa);
        setCargo(data?.cargo);
        setAtividade(data?.area_atuacao);
        setTipoUsuario(data?.tipo_usuario)
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    loadMembro();
  }, [id]);

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4} >
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading className='heading-title' fontSize='2xl' >Editar apoiador</Heading>
      </Flex>

      <Grid className="indicator-title" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Nome</Text>
          <Input
            className="mecanicos-input"
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
            className="mecanicos-input"
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

      <Grid className="indicator-title" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Empresa</Text>
          <Input
            className="mecanicos-input"
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
            className="mecanicos-input"
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
            className="mecanicos-input"
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
        <Box mb={[0, 0]} w="100%">
          <Text mb={2}>Tipo</Text>
          <Select
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            value={tipo_usuario}
            onChange={(value) => setTipoUsuario(value as string)}
          >
            <option value="master">Master</option>
            <option value="patrocinador">Patrocinador</option>
            <option value="institucional">Institucional</option>
          </Select>
        </Box>
      </Grid>

      <Flex justify="flex-start" mt={5}>

        <Button
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