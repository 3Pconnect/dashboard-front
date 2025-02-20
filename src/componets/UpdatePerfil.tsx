import { Button, Flex, Heading, Input, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Checkbox, Stack, useToast, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { fetchProfileById, updateProfile } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export const UpdatePerfil: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da rota
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [nomePerfil, setNomePerfil] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!id) throw new Error("ID do perfil não encontrado.");
        
        const profile = await fetchProfileById(Number(id));
        setNomePerfil(profile.name);
        setPermissoes(profile.permissions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, permissao: string) => {
    setPermissoes((prev) =>
      event.target.checked
        ? [...prev, permissao]
        : prev.filter((p) => p !== permissao)
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      if (!id) throw new Error("ID do perfil não encontrado.");

      const updatedProfile = await updateProfile(Number(id), nomePerfil, permissoes);
      toast({
        title: "Perfil Atualizado",
        description: "O perfil foi atualizado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate('/main/perfis');
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o perfil.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Flex justify="center" align="center" height="100vh"><Spinner size="xl" /></Flex>;
  }

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Flex align="center">
          <Button
            variant="ghost"
            leftIcon={<Icon as={MdArrowBack} />}
            mr={4}
            onClick={() => window.history.back()}
          >
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
              <BreadcrumbLink href="#">Perfil</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Heading fontSize="2xl" fontWeight="semibold">
          Editar Perfil
        </Heading>
      </Flex>

      <Box mb={6}>
        <Text mb={2}>Nome do Perfil</Text>
        <Input
          value={nomePerfil}
          onChange={(e) => setNomePerfil(e.target.value)}
          placeholder="Digite o nome do perfil"
        />
      </Box>

      <Box>
        <Heading fontSize="lg" mb={2}>Permissões</Heading>
        <Stack spacing={4}>
          <Box>
            <Text fontWeight="semibold">Dashboard</Text>
            <Checkbox
              colorScheme="gray"
              isChecked={permissoes.includes("dashboard")}
              onChange={(e) => handleCheckboxChange(e, "dashboard")}
            >
              Dashboard
            </Checkbox>
          </Box>

          <Box>
            <Text fontWeight="semibold">Usuários</Text>
            <Stack pl={4}>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("create.usuario")}
                onChange={(e) => handleCheckboxChange(e, "create.usuario")}
              >
                Criar Usuário
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("delete.usuario")}
                onChange={(e) => handleCheckboxChange(e, "delete.usuario")}
              >
                Deletar Usuário
              </Checkbox>
            </Stack>
          </Box>

          <Box>
            <Text fontWeight="semibold">Eventos</Text>
            <Stack pl={4}>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("create.events")}
                onChange={(e) => handleCheckboxChange(e, "create.events")}
              >
                Criar Evento
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("events.read")}
                onChange={(e) => handleCheckboxChange(e, "events.read")}
              >
                Ler Eventos
              </Checkbox>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {error && <Text color="red.500">{error}</Text>}

      <VStack alignItems="end" mt={6}>
        <Button
          colorScheme="green"
          onClick={handleSave}
          isLoading={saving}
          loadingText="Salvando..."
          spinnerPlacement="end"
        >
          Salvar
        </Button>
      </VStack>
    </>
  );
};
