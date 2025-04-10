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
        name,
        email,
        tipo_usuario,
        telefone,
        nome_empresa,
        cargo,
        cnpj,
        filterType,
        dataEvento

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
          Cadastrar Novo Membro
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box mb={4}>
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

        <Box mb={4}>
          <Text mb={2}>CNPJ</Text>
          <Input
            className='button-premium'
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
            value={filterType}
            onChange={setFilterType}
            style={{
              width: 180,
              height: "40px",
              color: "white",
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