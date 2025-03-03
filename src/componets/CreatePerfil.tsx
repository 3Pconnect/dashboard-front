import { Button, Flex, Heading, Input, Box, Text, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Checkbox, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { createProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export const CreatePerfil: React.FC = () => {
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [nomePerfil, setNomePerfil] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast(); // Hook para o Toast
  const navigate = useNavigate();


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, permissao: string) => {
    setPermissoes((prev) =>
      event.target.checked
        ? [...prev, permissao]
        : prev.filter((p) => p !== permissao)
    );
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const newProfile = await createProfile(nomePerfil, permissoes);
      console.log("Perfil criado com sucesso:", newProfile);
      navigate('/main/perfis')
      toast({
        title: "Perfil Criado",
        description: "O perfil foi criado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err: any) {
      setError(err.message);
      
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar o perfil.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
          Cadastrar Perfil
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
                isChecked={permissoes.includes("create.user")}
                onChange={(e) => handleCheckboxChange(e, "create.user")}
              >
                Criar Usuário
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("read.users")}
                onChange={(e) => handleCheckboxChange(e, "read.users")}
              >
                Listagem Usuários
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("edit.user")}
                onChange={(e) => handleCheckboxChange(e, "edit.user")}
              >
                Editar Usuário
              </Checkbox>
            </Stack>
          </Box>

          <Box>
            <Text fontWeight="semibold">Perfis</Text>
            <Stack pl={4}>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("create.profile")}
                onChange={(e) => handleCheckboxChange(e, "create.profile")}
              >
                Criar Perfil
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("read.profiles")}
                onChange={(e) => handleCheckboxChange(e, "read.profiles")}
              >
                Visualizar Perfis
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("edit.profile")}
                onChange={(e) => handleCheckboxChange(e, "edit.profile")}
              >
                Editar Perfil
              </Checkbox>
            </Stack>
          </Box>

          <Box>
            <Text fontWeight="semibold">Membros</Text>
            <Stack pl={4}>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("create.membro")}
                onChange={(e) => handleCheckboxChange(e, "create.membro")}
              >
                Criar Membro
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("read.membros")}
                onChange={(e) => handleCheckboxChange(e, "read.membros")}
              >
                Visualizar Membros
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("edit.membro")}
                onChange={(e) => handleCheckboxChange(e, "edit.membro")}
              >
                Editar Membro
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("edit.aprovar_reprovar.membro")}
                onChange={(e) => handleCheckboxChange(e, "aprovar_reprovar.membro")}
              >
                Aprovar / Reprovar Membro
              </Checkbox>
            </Stack>
          </Box>
          <Box>
            <Text fontWeight="semibold">Apoiadores</Text>
            <Stack pl={4}>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("create.apoiador")}
                onChange={(e) => handleCheckboxChange(e, "create.apoiador")}
              >
                Criar Apoiador
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("read.apoiadores")}
                onChange={(e) => handleCheckboxChange(e, "read.apoiadores")}
              >
                Visualizar Apoiadores
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                isChecked={permissoes.includes("edit.apoiador")}
                onChange={(e) => handleCheckboxChange(e, "edit.apoiador")}
              >
                Editar Apoiador
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
          isLoading={loading}
          loadingText="Salvando..."
          spinnerPlacement="end"
        >
          Salvar
        </Button>
      </VStack>
    </>
  );
};
