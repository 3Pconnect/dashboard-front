import { useEffect, useState } from "react";
import {
  Button, Flex, Heading, Grid, Box, Text, VStack,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useToast
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { demonstrarInteresse } from "../services/api"; // Importando a função demonstrarInteresse

interface LocationState {
  record: {
    id: number;
    produto: string;
    preco: number;
    inicio: string;
    fim: string;
    status: string;
    formularioEnviado: boolean;
    quantidadeMaximaPorUsuario: number;
    descricaoProduto: string;
  };
}

export const CreateInterest = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidadeMaxima, setQuantidadeMaxima] = useState("");
  const [quantidadeDesejada, setQuantidadeDesejada] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const location = useLocation();
  const record = (location.state as LocationState)?.record;

  useEffect(() => {
    if (record && record.produto) {
      setNome(record.produto);
    }
    if (record && record.descricaoProduto) {
      setDescricao(record.descricaoProduto);
    }
    if (record && record.preco) {
      setPreco(formatarPreco(record.preco));
    }
    if (record && record.quantidadeMaximaPorUsuario) {
      setQuantidadeMaxima(String(record.quantidadeMaximaPorUsuario));
    }
  }, [record]);

  const formatarPreco = (preco: number): string => {
    const precoFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
    return precoFormatado;
  };

  const handleSave = async () => {
    if (!quantidadeDesejada) {
      toast({
        title: "Erro",
        description: "Preencha a quantidade desejada.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (parseInt(quantidadeDesejada, 10) > parseInt(quantidadeMaxima, 10)) {
      toast({
        title: "Erro",
        description: "A quantidade desejada não pode ser maior que a quantidade máxima por usuário.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setSaving(true);

    try {
      if (record && record.id) {
        await demonstrarInteresse(record.id, parseInt(quantidadeDesejada, 10));

        toast({
          title: "Interesse Demonstrado",
          description: "Interesse na compra demonstrado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate('/main/list-product'); // Redireciona para a lista de produtos após o sucesso
      } else {
        toast({
          title: "Erro",
          description: "ID da compra não encontrado.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao demonstrar interesse na compra.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const calcularTotal = () => {
    const precoNumerico = parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.'));
    const quantidade = parseInt(quantidadeDesejada, 10);
    if (!isNaN(precoNumerico) && !isNaN(quantidade)) {
      return formatarPreco(precoNumerico * quantidade);
    }
    return formatarPreco(0);
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
        <Heading className="heading-title" fontSize="2xl" style={{ fontWeight: 'bold' }}>Preencher Compra</Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text className="indicator-title" mb={2}>Nome</Text>
          <Input
            disabled
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
            disabled
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
            disabled
            className="button-premium"
            allowClear
            placeholder="Digite o preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>Quantidade Máxima por Usuário</Text>
          <Input
            disabled
            className="button-premium"
            allowClear
            placeholder="Quantidade Máxima"
            value={quantidadeMaxima}
            onChange={(e) => setQuantidadeMaxima(e.target.value)}
            type="number"
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>

        <Box>
          <Text className="indicator-title" mb={2}>Quantidade Desejada</Text>
          <Input
            className="button-premium"
            allowClear
            placeholder="Quantidade Desejada"
            value={quantidadeDesejada}
            onChange={(e) => setQuantidadeDesejada(e.target.value)}
            type="number"
            style={{ height: "40px", width: "100%", backgroundColor: "transparent", color: "white", borderColor: "#2596be", borderWidth: "1px" }}
          />
        </Box>
      </Grid>
      <Box className="indicator-title" mt={4}>
        <Text fontSize="lg" fontWeight="bold">Resumo do Pedido:</Text>
        <Text>Valor Unitário: {preco}</Text>
        <Text>Quantidade: {quantidadeDesejada}</Text>
        <Text fontWeight="bold">Valor Total: {calcularTotal()}</Text>
      </Box>

      <VStack alignItems={"end"} mt={5}>
        <Button className="button-premium" colorScheme="green" onClick={handleSave} isLoading={saving} loadingText="Salvando...">
          {saving ? "Salvando..." : "Demonstrar Interesse"}
        </Button>
      </VStack>
    </>
  );
};