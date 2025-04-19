import { useEffect, useState } from "react";
import {
  Button, Flex, Heading, Grid, Box, Text, Checkbox, VStack, Breadcrumb,
  BreadcrumbItem, BreadcrumbLink, Icon, Spinner, useToast,
  useMediaQuery, useBreakpointValue
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { fetchProfiles, fetchUser, registerUser, updateUser } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Select } from "antd";

const situacaoFilterOptions = [
  { label: 'Ativo', value: 'ATIVO' },
  { label: 'Inativo', value: 'INATIVO' },
  { label: 'Pendente', value: 'PENDENTE' },
];

export const UpdateUser = () => {
  const [profiles, setProfiles] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1111111");
  const [situacao, setSituacao] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { id } = useParams();

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
    const loadUser = async () => {
      try {
        const data = await fetchUser(Number(id));
        console.log(data)
        setUsername(data?.username)
        setEmail(data?.email)
        setSituacao(data?.situacao)
        setSelectedProfile(data?.profile?.id)
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };

    loadProfiles();
    loadUser();
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
      await updateUser(username, email, profileName, situacao, Number(id));
      toast({
        title: "Usuário Atualizado",
        description: "Usuário atualizado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/main/users')
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao atualizar o usuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4}>
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading className='heading-title' fontSize='2xl' >Atualizar Usuário</Heading>


      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text className="indicator-title" mb={2}>Nome</Text>
          <Input
            allowClear
            placeholder="Digite o nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='mecanicos-input'
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>E-mail</Text>
          <Input
            allowClear
            placeholder="Digite o e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mecanicos-input'

          />
        </Box>
      </Grid>

      <VStack mt={5} spacing={4} align="stretch">
        <Box w={{ base: "100%", md: "200px" }} >
          <Text className="indicator-title" mb={2}>Situação do Usuário</Text>
          <Select style={{ width: "100%" }}
            className="button-premium"
            options={situacaoFilterOptions}
            placeholder="Selecione a situação"
            value={situacao} onChange={setSituacao} />
        </Box>
      </VStack>

      <VStack mt={5} alignItems={"start"}>
        <Text className="indicator-title" mb={2}>Perfil de Acesso</Text>
        {loading ? (
          <Spinner size="md" />
        ) : (
          profiles.map((profile) => (
            <Checkbox color="gray.700" key={profile.id} isChecked={selectedProfile === profile.id} onChange={() => handleCheckboxChange(profile.id)}>
              {profile.name}
            </Checkbox>
          ))
        )}
      </VStack>

      <Flex justify="flex-start" mt={5}>

        <Button w={{ base: "100%", md: "200px" }} color={"white"} bg={"#1b5ebc"} onClick={handleSave} isLoading={saving} loadingText="Atualizando...">
          {saving ? "Atualizando..." : "Atualizar"}
        </Button>

      </Flex>

    </Box>
  );
};