import { useEffect, useState } from "react";
import {
  Button, Flex, Heading, Grid, Box, Text, Checkbox, VStack,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Spinner, useToast, useBreakpointValue
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { fetchProfiles, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";

export const CreateUser = () => {
  const [profiles, setProfiles] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1111111");
  const [situacao, setSituacao] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const situacaoFilterOptions = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
    { label: 'Pendente', value: 'PENDENTE' },
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles(1, 200);
        setProfiles(data.profiles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedProfile(id);
  };

  const handleSave = async () => {
    if (!username || !email || !selectedProfile || !situacao) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const profileName = profiles.find((p) => p.id === selectedProfile)?.name || "";

    setSaving(true);

    try {
      await registerUser(username, email, password, profileName, situacao);
      toast({
        title: "Usuário Cadastrado",
        description: "Usuário cadastrado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/main/users');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao cadastrar o usuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Flex direction="column" p={4}>
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
                <BreadcrumbLink href="#">Usuários</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
        </Flex>
        <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" textAlign={{ base: 'left', md: 'right' }}>
          Cadastrar Usuário
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text className="indicator-title" mb={2}>Nome</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite o nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>E-mail</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite o e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
      </Grid>

      <VStack mt={5} spacing={4} align="stretch">
        <Box>
          <Text className="indicator-title" mb={2}>Situação do Usuário</Text>
          <Select style={{ width: "100px" }} className="button-premium" options={situacaoFilterOptions} placeholder="Selecione a situação" value={situacao} onChange={setSituacao} />
        </Box>
      </VStack>

      <VStack mt={5} alignItems="start">
        <Text className="indicator-title" mb={2}>Perfil de Acesso</Text>
        {loading ? (
          <Spinner size="md" />
        ) : (
          profiles.map((profile) => (
            <Checkbox key={profile.id} isChecked={selectedProfile === profile.id} onChange={() => handleCheckboxChange(profile.id)}>
              {profile.name}
            </Checkbox>
          ))
        )}
      </VStack>

      <Flex justify="flex-end" mt={5}>
        <Button className="button-premium" colorScheme="green" onClick={handleSave} isLoading={saving} loadingText="Salvando...">
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </Flex>
    </Flex>
  );
};