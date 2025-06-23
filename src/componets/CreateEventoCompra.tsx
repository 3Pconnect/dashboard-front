import { useEffect, useState } from "react";
import {
  Button, Flex, Heading, Grid, Box, Text, Icon, Spinner, useToast,
  useBreakpointValue, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { createVenda, fetchProducts, fetchProfiles } from "../services/api";
import { useNavigate } from "react-router-dom";
import { DatePicker, Input, Select, Table, TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import { Dayjs } from "dayjs";
import { truncateString } from "../utils/util";

interface DataType {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
}
type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

export const CreateEventoCompra = () => {
  const [profiles, setProfiles] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState("");
  const [quantidadeMaxima, setQuantidadeMaxima] = useState("");
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const [data, setData] = useState<DataType[]>([]);

  const [situacao, setSituacao] = useState("");

  const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, current: 1 });
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
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

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchProducts(searchValue, page, pagination?.pageSize || 10);
      setData(response.produtos);
      setTotal(response.total);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.total,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current || 1);
  }, [pagination.current, searchValue]);

  const handleSave = async () => {
    if (!quantidade || !quantidadeMaxima || !productId || !dateRange) {
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
      if (!dateRange || !dateRange[0] || !dateRange[1]) {
        throw new Error("Intervalo de datas inválido.");
      }

      const vendaData = {
        quantidade: parseInt(quantidade),
        produtoId: parseInt(productId),
        quantidadeMaximaPorUsuario: parseInt(quantidadeMaxima),
        quantidadeTotal: parseInt(quantidade),
        dataInicio: dateRange[0].toISOString(),
        dataFim: dateRange[1].toISOString(),
        situacao
      };

      await createVenda(vendaData);

      toast({
        title: "Venda Criada",
        description: "Venda criada com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/main/list-evento-compras');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao criar a venda.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      sortOrder: sortedInfo.columnKey === 'nome' ? sortedInfo.order : null,
      render: (nome) => `R$ ${truncateString(nome, 10)}`,
      ellipsis: true,
    },
    ...(isMobile ? [] : [{
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      ellipsis: true,
    }]),
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco) => `R$ ${parseFloat(preco).toFixed(2)}`,
    },
  ];

  const handleTableChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
    setPagination({ ...pagination, current: pagination.current || 1 });
  };

  return (
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4} >
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading className='heading-title' fontSize='2xl' >Compra coletiva</Heading>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Text className="indicator-title" mb={2}>Quantidade</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Ex: 2"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
        <Box>
          <Text className="indicator-title" mb={2}>Quantidade Máxima Por Usuário</Text>
          <Input
            className="mecanicos-input"
            allowClear
            placeholder="Ex: 1"
            value={quantidadeMaxima}
            onChange={(e) => setQuantidadeMaxima(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>

        <Box w="100%">
          <Text className="indicator-title" mb={2}>Produto</Text>
          <Input
            disabled
            className="mecanicos-input"
            allowClear
            placeholder="Ex: 1"
            value={productName}
            style={{
              height: "40px",
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px"
            }}
          />
        </Box>
        <Box w="100%">
          <Text className="indicator-title" mb={2}>Périodo</Text>
          <DatePicker.RangePicker
            className="mecanicos-input"
            value={dateRange ? [dateRange[0], dateRange[1]] : null}
            onChange={(dates) => setDateRange(dates)}
            dropdownClassName="custom-dropdown"
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0px",
              borderColor: "#2596be",
              borderWidth: "1px",
            }}
            inputReadOnly={false}
          />
        </Box>
        <Box mb={4}>
          <Text mb={2}>Estados</Text>
          <Select
            className="button-premium"
            style={{
              width: "100%",
              height: "40px",
              color: "white",
            }}
            placeholder="Selecione o estado"
            value={situacao}
            onChange={(e) => setSituacao(e)}
          >
            <option key={"inativo"} value={"inativo"}>
            Inativo
            </option>
            <option key={"ativo"} value={"ativo"}>
            Ativo
            </option>
          </Select>
        </Box>
      </Grid>

      <VStack w={"full"} mt={5} alignItems={"start"}>
        <Text className="indicator-title" mb={2}>Lista de Produtos</Text>
        {loading ? (
          <Spinner size="md" />
        ) : (
          <Table<DataType>
            columns={columns}
            style={{ width: "100%" }}
            dataSource={data}
            loading={loading}
            onChange={handleTableChange}
            pagination={{ ...pagination, total }}
            scroll={{ x: 'max-content' }}
            onRow={(record) => ({
              onClick: () => {
                setProductName(record.nome)
                setProductId(record.id)
              },
              style: { cursor: 'pointer' }
            })}
          />
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
    </Box>
  );
};