import {
  Box, Button, Heading, Image, Text, VStack, useToast
} from "@chakra-ui/react";
import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CriarNovaSenhaForm: React.FC = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!novaSenha || !confirmarSenha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas são diferentes.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      // Aqui você chamaria sua API para alterar a senha
      toast({
        title: "Senha atualizada",
        description: "Sua nova senha foi criada com sucesso!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar sua senha.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="indicator-title" bg={"#07104a"} color={"white"} h={"100vh"} display="flex" justifyContent="center" alignItems="center" px={4}>
      <Box bg={"#060c32"} borderRadius="md" p={8} maxW="400px" w="full">
        <VStack spacing={6}>
          <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo" boxSize="60px" />
          <Heading className="heading-title" fontSize="xl" textAlign="center">Criar Nova Senha</Heading>

          <Box w="full">
            <Text mb={2}>Nova Senha</Text>
            <Input
              type="password"
              className="button-premium"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite a nova senha"
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

          <Box w="full">
            <Text mb={2}>Confirmar Senha</Text>
            <Input
              type="password"
              className="button-premium"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme a nova senha"
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

          <Button
            className='button-premium'
            onClick={handleSubmit}
            isLoading={loading}
            colorScheme="blue"
            width="full"
          >
            Criar Senha
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
