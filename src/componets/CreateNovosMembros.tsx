import { Button, Flex, Heading, Grid, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, useBreakpointValue } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
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

export const CreateNovosMembros = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [situacao, setSituacao] = useState("em_analise");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [filterType, setFilterType] = useState<string>('inativo');
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [dataEvento, setDataEvento] = useState<Dayjs | null>(dayjs());

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
          atendimento_carros_premium: ""
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

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4}>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading className="heading-title" fontSize="2xl" fontWeight="bold">
          Criar Membro
        </Heading>
      </Flex>

      <Grid className="indicator-title" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
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
      </Grid>

      <Grid className="indicator-title" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
          <Text mb={2}>Empresa</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o e-mail do membro"
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
        <Box w={{ base: "100%", md: "200px" }} >
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