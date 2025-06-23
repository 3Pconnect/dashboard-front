import {
  Box, Button, Heading, Image, Text, VStack, useToast
} from "@chakra-ui/react";
import { Input } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserPassword } from "../services/api";

export const CriarNovaSenhaForm: React.FC = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [senhaAtualizada, setSenhaAtualizada] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

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
      if (!id) throw new Error("ID do usuário não fornecido.");
      await updateUserPassword(id, novaSenha);

      setSenhaAtualizada(true);
      toast({
        title: "Senha atualizada",
        description: "Sua nova senha foi criada com sucesso!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Ocorreu um erro ao atualizar sua senha.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg={"#f8f9fa"} color={"white"} h={"100vh"} display="flex" justifyContent="center" alignItems="center" px={4}>
      <Box bg={"white"} borderRadius="md" p={8} maxW="400px" w="full">
        <VStack spacing={6}>
          <Image src="https://mecanicospremium.com.br/build/assets/logo-e787336c.png" alt="Logo" boxSize="60px" />
          <Heading className="indicator-title" fontSize="xl" textAlign="center" color="black">
            Criar Nova Senha
          </Heading>

          {senhaAtualizada ? (
            <VStack spacing={4}>
              <Text className="indicator-title" color="black" textAlign="center">
                Sua nova senha foi criada com sucesso!
              </Text>
              <Button
                className="button-premium"
                colorScheme="blue"
                width="full"
                onClick={() => navigate("/")}
              >
                Ir para Login
              </Button>
            </VStack>
          ) : (
            <>
              <Box w="full">
                <Text mb={2} color="black">Nova Senha</Text>
                <Input
                  type="password"
                  className="mecanicos-input"
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
                <Text mb={2} color="black">Confirmar Senha</Text>
                <Input
                  type="password"
                  className="mecanicos-input"
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
                className="button-premium"
                onClick={handleSubmit}
                isLoading={loading}
                colorScheme="blue"
                width="full"
              >
                Criar Senha
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
