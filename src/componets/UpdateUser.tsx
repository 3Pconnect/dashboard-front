import { useEffect, useState } from "react";
import {
  Button, Flex, Heading, Input, Grid, Box, Text, Checkbox, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Spinner, useToast
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { fetchProfiles, fetchUser, registerUser, updateUser } from "../services/api"; // Importando a função correta
import { useNavigate, useParams } from "react-router-dom";

export const UpdateUser = () => {
  const [profiles, setProfiles] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1111111");
  const [situacao, setSituacao] = useState("");
  const [saving, setSaving] = useState(false); // Variável para controle do loading de salvar
  const toast = useToast(); // Hook para o Toast
  const navigate = useNavigate();
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

    setSaving(true); // Inicia o loading

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
      setSaving(false); // Finaliza o loading
    }
  };

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Flex align="center">
          <Button variant="ghost" leftIcon={<Icon as={MdArrowBack} />} mr={4} onClick={() => window.history.back()}>
            Voltar
          </Button>
          <Breadcrumb>
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
        </Flex>
        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>Atualizar Usuário</Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text mb={2}>Nome</Text>
          <Input placeholder="Digite seu nome" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Box>
        <Box>
          <Text mb={2}>E-mail</Text>
          <Input placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Box>
      </Grid>

      <VStack mt={5} spacing={4} align="stretch">

        <Box>
          <Text mb={2}>Situação do Usuário</Text>
          <Select placeholder="Selecione a situação" value={situacao} onChange={(e) => setSituacao(e.target.value)}>
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
            <option value="PENDENTE">Pendente</option>
          </Select>
        </Box>
      </VStack>

      <VStack mt={5} alignItems={"start"}>
        <Text mb={2}>Perfil de Acesso</Text>
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

      <VStack alignItems={"end"} mt={5}>
        <Button colorScheme="green" onClick={handleSave} isLoading={saving} loadingText="Atualizando...">
          {saving ? "Atualizando..." : "Atualizar"}
        </Button>
      </VStack>
    </>
  );
};
