import { useState } from "react";
import {
  Button, Flex, Heading, Grid, Box, Text, VStack,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { createProduct } from "../services/api"; // Importando a função correta

export const CreateProduct = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!nome || !descricao || !preco || !estoque) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setSaving(true);

    try {
      await createProduct({
        nome,
        descricao,
        preco: parseFloat(preco),
        estoque: parseInt(estoque, 10),
      });

      toast({
        title: "Produto Cadastrado",
        description: "Produto cadastrado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate('/main/list-product');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao cadastrar o produto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Flex mb={10} className="indicator-title" justify="space-between" align="center" width="100%">
        <Flex align="center">
          <Button colorScheme="white" variant="ghost" leftIcon={<Icon as={MdArrowBack} />}
            mr={4} onClick={() => window.history.back()}>
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
              <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Heading className="heading-title" fontSize="2xl" style={{ fontWeight: 'bold' }}>Cadastrar Produto</Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text className="indicator-title" mb={2}>Nome</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>Descrição</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite a descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>Preço</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite o preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            type="number"
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>Estoque</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Digite a quantidade em estoque"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            type="number"
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>
      </Grid>

      <VStack alignItems={"end"} mt={5}>
        <Button className="button-premium" colorScheme="green" onClick={handleSave} isLoading={saving} loadingText="Salvando...">
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </VStack>
    </>
  );
};
