import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, DatePicker, Tag } from 'antd';
import { Heading, Flex, Button, useToast, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineFileText, AiOutlineSearch } from 'react-icons/ai';
import { fetchSales } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';

interface VendaType {
  id: number;
  produto: string;
  preco: number;
  inicio: string;
  fim: string;
  status: string;
  formularioEnviado: boolean;
  quantidadeMaximaPorUsuario: number;
  descricaoProduto: string;
}

type OnChange = NonNullable<TableProps<VendaType>['onChange']>;
type Filters = Parameters<OnChange>[1];

const CompraColetivaList: React.FC = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [data, setData] = useState<VendaType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, current: 1 });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const datePickerWidth = useBreakpointValue({ base: '100%', md: '300px' });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDelete = async (id: number) => {
    try {
      toast({
        title: 'Venda excluída',
        description: 'A venda foi excluída com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a venda.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchData = async (page: number, limit: number = 10, dataInicio?: string, dataFim?: string) => {
    setLoading(true);
    try {
      const response = await fetchSales(page, limit, dataInicio, dataFim);

      // Acessa o array 'data' dentro da resposta
      const vendasFormatadas = response.data.map((venda: any) => ({
        id: venda.id,
        produto: venda.produto.nome,
        preco: parseFloat(venda.produto.preco),
        inicio: venda.dataInicio,
        fim: venda.dataFim,
        status: venda.quantidadeTotal > 0 ? 'DISPONÍVEL' : 'INDISPONÍVEL',
        formularioEnviado: venda.formulario_enviado,
        quantidadeMaximaPorUsuario: venda.quantidadeMaximaPorUsuario,
        descricaoProduto: venda.produto.descricao,
      }));

      setData(vendasFormatadas);
      setTotal(response.total);

      setPagination((prev) => ({
        ...prev,
        current: parseInt(response.page),
        total: response.total,
      }));
    } catch (error) {
      toast({
        title: 'Erro ao buscar vendas',
        description: (error as Error).message || 'Tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startDate = dateRange ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined;
    const endDate = dateRange ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined;
    fetchData(pagination.current || 1, 10, startDate, endDate);
  }, [pagination.current, dateRange]);

  const handleTableChange: OnChange = (pagination) => {
    setFilteredInfo({});
    setPagination({ ...pagination, current: pagination.current || 1 });
  };

  const handleSearch = () => {
    const startDate = dateRange ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined;
    const endDate = dateRange ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined;
    fetchData(1, 10, startDate, endDate);
  };

  const columns: TableColumnsType<VendaType> = [
    {
      title: 'Produto',
      dataIndex: 'produto',
      key: 'produto',
      sorter: (a, b) => a.produto.localeCompare(b.produto),
    },
    ...(isMobile
      ? []
      : [
        {
          title: 'Preço',
          dataIndex: 'preco',
          key: 'preco',
          sorter: (a:any, b:any) => a.preco - b.preco,
          render: (preco:any) => `R$ ${preco.toFixed(2)}`,
        },
        ]),

    ...(isMobile
      ? []
      : [
          {
            title: 'Período',
            dataIndex: 'inicio',
            key: 'periodo',
            render: (_: string, record: VendaType) => {
              return <span>{`${formatDate(record.inicio)} - ${formatDate(record.fim)}`}</span>;
            },
          },
        ]),
    // {
    //   title: 'Formulário Enviado',
    //   dataIndex: 'formularioEnviado',
    //   key: 'formularioEnviado',
    //   render: (enviado) => <Tag color={enviado ? 'green' : 'red'}>{enviado ? 'Sim' : 'Não'}</Tag>,
    // },
    {
      title: 'Ações',
      key: 'formularioEnviado',
      dataIndex: 'formularioEnviado',
      render: (enviado, record) => (
        <Button
          isDisabled={enviado}
          variant={'ghost'}
          colorScheme="blue"
          onClick={(e) => {
            e.stopPropagation();
            console.clear();
            console.log(record);
            navigate(`/main/create-interest/${record.id}`, { state: { record } });
          }}
        >
          {enviado ? 'Preenchido' : 'Preencher'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl" fontWeight="bold">
          Compra Coletiva
        </Heading>
      </Flex>

      <Flex mb={6} justify={{ base: 'center', md: 'flex-start' }} align="center" gap={4} width="100%" flexWrap="wrap">
        <DatePicker.RangePicker
          value={dateRange ? [dateRange[0], dateRange[1]] : null}
          onChange={(dates) => setDateRange(dates)}
          dropdownClassName="custom-dropdown"
          style={{
            width: datePickerWidth,
            height: '40px',
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '0px',
            borderColor: '#2596be',
            borderWidth: '1px',
          }}
          inputReadOnly={false}
        />

        <Button colorScheme="blue" onClick={handleSearch} leftIcon={<AiOutlineSearch />} flexGrow={{ base: 1, md: 0 }}>
          Buscar
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
            //navigate('/main/create-event-compras/' + record?.id);
          },
          style: { cursor: 'pointer' },
        })}
        rowKey="id"
      />
    </>
  );
};

export default CompraColetivaList;