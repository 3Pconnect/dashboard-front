import {
  Button, Flex, Heading, Grid, Box, Text, VStack,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, Image, Stack, Checkbox
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
import { registerMembro } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import dayjs from "dayjs";

export const SejaMembroForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_empresa, setNomeEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [site, setSite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [atendimentoCarrosPremium, setAtendimentoCarrosPremium] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [bosch_car_service, setBoschCarService] = useState(false);
  const [modulo_diagnostico_bosch, setModuloDiagnosticoBosch] = useState(false);
  const [equipamento_bosch, setEquipamentoBosch] = useState(false);
  const [em_dia_com_obrigacoes, setEmDiaComObrigacoes] = useState(false);
  const [afiliacao, setAfiliadoEntidade] = useState(false);
  const [vencimento, setVencimento] = useState<dayjs.Dayjs | null>(null);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Validações
    if (!name) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, digite seu nome.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!email) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, digite seu e-mail.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "E-mail Inválido",
        description: "Por favor, digite um e-mail válido.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    if (!telefone) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, digite seu telefone.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!nome_empresa) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, digite o nome da empresa.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!cargo) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, digite seu cargo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!cnpj) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, digite o CNPJ da empresa.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (!/^\d{14}$/.test(cnpj)) {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, digite um CNPJ válido (14 dígitos).",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    if (!atendimentoCarrosPremium) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, selecione a porcentagem de atendimento de carros premium.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!categoria) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, selecione a categoria da empresa.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

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
          atendimento_carros_premium: atendimentoCarrosPremium,
          vencimento,
          bosch_car_service,
          modulo_diagnostico_bosch,
          equipamento_bosch,
          em_dia_com_obrigacoes,
          afiliacao
        }
      );
      console.log("Membro registrado com sucesso", response);
      toast({
        title: "Cadastro Enviado",
        description: "Seu cadastro foi enviado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSubmissionSuccess(true);
      // Optionally reset the form after successful submission
      setName("");
      setEmail("");
      setTipoUsuario("");
      setTelefone("");
      setNomeEmpresa("");
      setCargo("");
      setCnpj("");
      setEndereco("");
      setSite("");
      setInstagram("");
      setAtendimentoCarrosPremium("");
      setCategoria("");
      // navigate('/main/novos-membros');
    } catch (error: any) {
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

  if (submissionSuccess) {
    return (
      <Box bg={"#07104a"} color={"white"} h={"100vh"} py={20} px={{ base: 4, md: 20 }} w={"full"} display="flex" justifyContent="center" alignItems="center">
        <Box borderRadius={"5px"} p={10} bg={"#060c32"} maxWidth={{ base: "95%", md: "container.md", lg: "70%" }} width="100%" textAlign="center">
          <VStack className="indicator-title" spacing={4} align="center">
            <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo Mecânicos Premium" boxSize="80px" />
            <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mt={4}>
              Cadastro Enviado com Sucesso!
            </Heading>
            <Text fontSize="md">
              Agradecemos o seu interesse em se tornar membro da Mecânicos Premium.
              Seu cadastro foi enviado e está em análise. Em breve entraremos em contato.
            </Text>
            <Button colorScheme="blue" onClick={() => navigate("/")}>
              Voltar para a Página Inicial
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="indicator-title" bg={"#07104a"} color={"white"} h={"auto"} pb={10} px={{ base: 4, md: 20 }} w={"full"} display="flex" justifyContent="center" alignItems="center">
      <Box borderRadius={"5px"} p={5} bg={"#060c32"} maxWidth={{ base: "95%", md: "container.md", lg: "70%" }} width="100%">
        <VStack py={8} align="center">
          <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo Mecânicos Premium" boxSize="50px" />
          <Heading className="heading-title" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mt={4}>
            Seja Membro
          </Heading>
        </VStack>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={4}
          mb={6}
        >
          <Box>
            <Text mb={2}>Nome</Text>
            <Input
              className='button-premium'
              allowClear
              placeholder="Digite o nome do membro"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Text mb={2}>E-mail</Text>
            <Input
              className='button-premium'
              allowClear
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={4}
          mb={6}
        >
          <Box>
            <Text mb={2}>Empresa</Text>
            <Input
              className='button-premium'
              allowClear
              placeholder="Digite o nome da empresa"
              value={nome_empresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
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
            <Text mb={2}>Telefone</Text>
            <Input
              className='button-premium'
              allowClear
              placeholder="Digite o telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
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
            <Text mb={2}>Cargo</Text>
            <Input
              className='button-premium'
              allowClear
              placeholder="Digite o cargo do membro"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
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
            <Text mb={2}>Site</Text>
            <Input
              className='button-premium'
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
              className='button-premium'
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

          <Box>
            <Text mb={2}>cnpj</Text>
            <Input
              className='button-premium'
              allowClear
              placeholder="Digite o CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
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
        </Grid>

        <Box mb={5}>
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

        <Box mb={5}>
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

        <Box mb={6}>
          <Text fontWeight="semibold" mb={3}>Avaliação de Requisitos para novo Associado</Text>
          <Stack pl={4} spacing={3}>
            <Checkbox
              colorScheme="gray"
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
          </Stack>
        </Box>
        <VStack alignItems={"end"} mt={5}>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Cadastrando..."
            width={{ base: "full", md: "auto" }}
          >
            Enviar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};