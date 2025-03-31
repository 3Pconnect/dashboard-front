import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, DatePicker, Tag } from 'antd';
import { Heading, Flex, Button, useToast, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineFileText, AiOutlineSearch } from 'react-icons/ai';
import { fetchSales } from '../services/api'; // Certifique-se de que o caminho esteja correto
import dayjs, { Dayjs } from 'dayjs';

interface VendaType {
  id: number;
  produto: string;
  preco: number;
  inicio: string;
  fim: string;
  status: string;
  formularioEnviado: boolean;
  quantidadeMaximaPorUsuario: number,
  descricaoProduto: string,
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
  const datePickerWidth = useBreakpointValue({ base: "100%", md: "300px" });

  const handleDelete = async (id: number) => {
    try {
      // Aqui você chamaria sua API para excluir a venda com o ID fornecido
      // await deleteSale(id); // Substitua por sua função de exclusão
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

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchSales(); // Chama a função para buscar as vendas

      const vendasFormatadas = response.map((venda: any) => ({
        id: venda.id,
        produto: venda.produto.nome,
        preco: parseFloat(venda.produto.preco),
        inicio: venda.dataInicio,
        fim: venda.dataFim,
        status: venda.quantidadeTotal > 0 ? "DISPONÍVEL" : "INDISPONÍVEL",
        formularioEnviado: venda.formulario_enviado,
        quantidadeMaximaPorUsuario: venda.quantidadeMaximaPorUsuario,
        descricaoProduto: venda.produto.descricao,

      }));

      setData(vendasFormatadas);
      setTotal(response.length);

      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.length,
      }));
    } catch (error) {
      toast({
        title: 'Erro ao buscar vendas',
        description: (error as Error).message || 'Tente novamente mais tarde.',
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
    ...(isMobile
      ? []
      : [
          {
            title: 'Período',
            dataIndex: 'inicio',
            key: 'periodo',
            render: (_: string, record: VendaType) => {
              const formatDate = (dateString: string) => {
                return new Date(dateString).toLocaleDateString('pt-BR');
              };
              return <span>{`${formatDate(record.inicio)} - ${formatDate(record.fim)}`}</span>;
            },
          },
        ]),
    {
      title: 'Formulário Enviado',
      dataIndex: 'formularioEnviado',
      key: 'formularioEnviado',
      render: (enviado) => (
        <Tag color={enviado ? 'green' : 'red'}>{enviado ? 'Sim' : 'Não'}</Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'formularioEnviado',
      dataIndex: 'formularioEnviado',
      render: (enviado, record) => (
        <Button
        isDisabled={enviado}
          variant={'ghost'}
          colorScheme='blue'
          onClick={(e) => {
            e.stopPropagation();
            //handleDelete(record.id);
            console.clear()
            console.log(record)
            navigate(`/main/create-interest/${record.id}`, { state: { record } });
            //navigate("/main/create-interest/"+record.id)
          }}
        >
          {enviado ? "Preenchido": "Preencher"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl" fontWeight="bold">
          Vendas Disponíveis
        </Heading>
      </Flex>

      <Flex
        mb={6}
        justify={{ base: 'center', md: 'flex-start' }}
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
            height: '40px',
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '0px',
            borderColor: '#2596be',
            borderWidth: '1px',
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