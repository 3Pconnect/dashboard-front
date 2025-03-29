import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, DatePicker } from 'antd';
import { Heading, Flex, Button, useToast, Tag, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { deleteUser, fetchVendasDisponiveis } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';

interface VendaType {
  id: string;
  produto: string;
  preco: number;
  dataVenda: string;
  status: string;
  inicio: string;
  fim: string;
}

type OnChange = NonNullable<TableProps<VendaType>['onChange']>;
type Filters = Parameters<OnChange>[1];

const VendasDisponiveisList: React.FC = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [data, setData] = useState<VendaType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, current: 1 });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const datePickerWidth = useBreakpointValue({ base: "100%", md: "300px" });

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const startDate = dateRange?.[0]?.format('YYYY-MM-DD');
      const endDate = dateRange?.[1]?.format('YYYY-MM-DD');

      const response = await fetchVendasDisponiveis(page, pagination.pageSize || 10, startDate, endDate);

      // Mapeia os dados corretamente para a tabela
      const vendasFormatadas = response.data.map((venda: any) => ({
        id: venda.id,
        produto: venda.produto.nome,  // Pegando o nome do produto dentro do objeto produto
        preco: parseFloat(venda.produto.preco),  // Convertendo preço para número
        inicio: venda.dataInicio,
        fim: venda.dataFim,  // Ajuste conforme necessário
        status: venda.quantidadeTotal > 0 ? "DISPONÍVEL" : "INDISPONÍVEL",
      }));

      setData(vendasFormatadas);
      setTotal(response.total);

      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.total,
      }));
    } catch (error) {
      toast({
        title: 'Erro ao buscar vendas',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current || 1);
  }, [pagination.current]);

  const handleTableChange: OnChange = (pagination) => {
    setFilteredInfo({});
    setPagination({ ...pagination, current: pagination.current || 1 });
  };

  const handleSearch = () => {
    fetchData(1);
  };

  const columns: TableColumnsType<VendaType> = [
    {
      title: 'Produto',
      dataIndex: 'produto',
      key: 'produto',
      sorter: (a, b) => a.produto.localeCompare(b.produto),
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      sorter: (a, b) => a.preco - b.preco,
      render: (preco) => `R$ ${preco.toFixed(2)}`,
    },
    ...(isMobile ? [] : [{
      title: 'Período',
      dataIndex: 'dataInicio',
      key: 'dataInicio',
      render: (_: string, record: VendaType) => {
        const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleDateString('pt-BR');
        };
        return <span>{`${formatDate(record.inicio)} - ${formatDate(record.fim)}`}</span>;
      },
    }]),
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: VendaType) => (
        <Button variant={'ghost'} colorScheme='red' onClick={(e) => {
          e.stopPropagation();
          handleDelete(record.id);
        }}>
          <AiFillDelete />
        </Button>
      ),
    },
  ] as TableColumnsType<VendaType>;
  
  return (
    <>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl" fontWeight="bold">Vendas Disponíveis</Heading>
      </Flex>

      <Flex
      mb={6}
      justify={{ base: "center", md: "flex-start" }}
      align="center"
      gap={4}
      width="100%"
      flexWrap="wrap"
    >
      <DatePicker.RangePicker
        value={dateRange ? [dateRange[0], dateRange[1]] : null}
        onChange={(dates) => setDateRange(dates)}
        dropdownClassName="custom-dropdown"
        style={{
          width: datePickerWidth,
          height: "40px",
          backgroundColor: "transparent",
          color: "white",
          borderRadius: "0px",
          borderColor: "#2596be",
          borderWidth: "1px",
        }}
        inputReadOnly={false}
      />

      <Button
        colorScheme="blue"
        onClick={handleSearch}
        leftIcon={<AiOutlineSearch />}
        flexGrow={{ base: 1, md: 0 }}
      >
        Buscar
      </Button>

      <Button
        className="button-premium"
        onClick={() => navigate("/main/create-user")}
        colorScheme="green"
        fontSize="16px"
        fontWeight="bold"
        flexGrow={{ base: 1, md: 0 }}
      >
        Adicionar
      </Button>
    </Flex>

      <Table<VendaType>
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
        pagination={{ ...pagination, total }}
        onRow={(record) => ({
          onClick: () => {
            navigate('/main/create-event-compras/' + record?.id)
          },
          style: { cursor: 'pointer' }
        })}
        rowKey="id"
      />
    </>
  );
};

export default VendasDisponiveisList;
