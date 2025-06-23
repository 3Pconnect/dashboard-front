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
    <Flex className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4} direction="column" >
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading className='heading-title' fontSize='2xl' >Cadastrar Usuário</Heading>
      </Flex>


      <Grid className="indicator-title" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text mb={2} className="indicator-title">Nome</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Digite o nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />
        </Box>
        <Box className="indicator-title">
          <Text mb={2} color="gray.600">E-mail</Text>
          <Input
            allowClear
            placeholder="Digite o e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "#f9f9f9",
              color: "#333",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </Box>
      </Grid>

      <VStack mt={5} spacing={4} align="stretch">
        <Box w={{ base: "100%", md: "200px" }} >
          <Text mb={2} className="indicator-title">Situação do Usuário</Text>
          <Select
            style={{ width: "100%" }}
            options={situacaoFilterOptions}
            placeholder="Selecione a situação"
            value={situacao}
            onChange={setSituacao}
            className="button-premium"
          />
        </Box>
      </VStack>

      <VStack mt={5} alignItems="start">
        <Text mb={2} className="indicator-title">Perfil de Acesso</Text>
        {loading ? (
          <Spinner size="md" />
        ) : (
          profiles.map((profile) => (
            <Checkbox
              key={profile.id}
              isChecked={selectedProfile === profile.id}
              onChange={() => handleCheckboxChange(profile.id)}
              colorScheme="orange"
              color="gray.700"
            >
              {profile.name}
            </Checkbox>
          ))
        )}
      </VStack>

      <Flex justify="flex-start" mt={5}>

        <Button
          className="button-premium"
          onClick={handleSave}
          isLoading={saving}
          loadingText="Salvando..."
          bg="#1b5ebc"
          color="white"
          colorScheme="green"
          w={{ base: "100%", md: "200px" }} // 100% no mobile, 200px no desktop
        >
          {saving ? "Salvando..." : "Salvar"}
        </Button>

      </Flex>
    </Flex>
  );
};