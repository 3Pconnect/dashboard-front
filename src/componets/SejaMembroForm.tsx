import { Button, Flex, Heading, Input, Grid, Box, Text, VStack, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast, Image, Stack, Checkbox } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md"; // Ícone para o botão de voltar
import { useState } from "react";
import { registerMembro } from "../services/api";
import { useNavigate } from "react-router-dom";

export const SejaMembroForm = () => {
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
  const [atendimentoCarrosPremium, setAtendimentoCarrosPremium] = useState(" ");
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const toast = useToast(); // Hook para o Toast
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true); // Inicia o loading ao clicar no botão
    try {
      const response = await registerMembro(
        name,
        email,
        tipo_usuario,
        telefone,
        nome_empresa,
        cargo,
        cnpj,
        atendimentoCarrosPremium
      );
      console.log("Membro registrado com sucesso", response);
      toast({
        title: "Usuário Cadastrado",
        description: "Usuário cadastrado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
     // navigate('/main/novos-membros'); // Redireciona após o cadastro
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
      setLoading(false); // Desativa o loading quando a requisição terminar
    }
  };

  return (
    <>
<Box bg={"#182433"} h={"auto"} pb={10} px={20} w={"full"}>
    <VStack py={10}>
    <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo Mecânicos Premium" boxSize="50px" />
        
    </VStack>
<Box borderRadius={"5px"}  p={5} bg={"white"}>
<Flex mb={10} justify="space-between" align="center" width="full">

        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>
          Seja Membro
        </Heading>
      </Flex>

      {/* Grid para os campos de Nome, E-mail, Empresa e Cargo */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo: 1 coluna em mobile e 2 em dispositivos maiores
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Nome</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite o nome do membro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>E-mail</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite o e-mail do membro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsivo
        gap={4}
      >
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Empresa</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite o nome da empresa"
            value={nome_empresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
          />
        </Box>
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Telefone</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite o telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Box>
        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Cargo</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite o cargo do membro"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Site</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite a url do site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
        </Box>

        <Box mb={4}> {/* Adicionado espaçamento inferior */}
          <Text mb={2}>Instagram</Text>
          <Input
          bg="white" color="black"
            placeholder="Digite o @ "
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Box>
      </Grid>

      {/* Campo Situação */}
      <Box mt={5}>
        <Text mb={2}>Situação</Text>
        <Select
        bg="white" color="black"
          placeholder=" "
          value={atendimentoCarrosPremium}
          onChange={(e) => setAtendimentoCarrosPremium(e.target.value)}
        >
          <option value="0a20">De 0 a 20%</option>
          <option value="20a40">De 20 a 40%</option>
          <option value="40a60">De 40 a 50%</option>
          <option value="acima80">Acima de 80%</option>
        </Select>
      </Box>

      <Box mt={5}>
        <Text mb={2}>Categoria da Empresa</Text>
        <Select
        bg="white" color="black"
          placeholder=" "
          value={atendimentoCarrosPremium}
          onChange={(e) => setAtendimentoCarrosPremium(e.target.value)}
        >
          <option value="simples_nacional">Simples Nacional</option>
          <option value="lucro_presumido">Lucro Presumido</option>
          <option value="lucro_real">De 40 a 50%</option>
        </Select>
      </Box>

      <Box>
            <Text my={5} fontWeight="semibold">Avaliação de Requisitos para novo Associado</Text>
            <Stack pl={4}>
              <Checkbox
                colorScheme="gray"
                onChange={(e) => ()=>{}}
              >
                É Bosch Car Service
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                onChange={(e) => ()=>{}}
              >
                Módulo de Diagnóstico Bosch
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                onChange={(e) => ()=>{}}
              >
                Possui Equipamento Bosch
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                onChange={(e) => ()=>{}}
              >
                Em Dia com Obrigações Federais, Estaduais e Municipais
              </Checkbox>
              <Checkbox
                colorScheme="gray"
                onChange={(e) => ()=>{}}
              >
                Afiliado a Entidades, Sindicato ou Associação
              </Checkbox>
            </Stack>
          </Box>

      {/* Botão Salvar */}
      <VStack alignItems={"end"} mt={5}>
        <Button 
          colorScheme="green" 
          onClick={handleSubmit} 
          isLoading={loading} // Adiciona o estado de loading
          loadingText="Cadastrando..." // Texto de carregamento
        >
          Enviar
        </Button>
      </VStack>
</Box>
</Box>
    </>
  );
};
