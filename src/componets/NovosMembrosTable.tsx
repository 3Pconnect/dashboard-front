import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, DatePicker, Select } from 'antd';
import { Heading, Flex, Button, useToast, Tag, useMediaQuery, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { fetchUsers, deleteUser, fetchMembros, deleteMembro, aprovarMembro } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';
import { reduzirTexto } from '../utils/util';

interface DataType {
  id: number;
  name: string;
  tipo_usuario: string;
  email: string;
  endereco: string;
  telefone: string;
  nome_empresa: string;
  cargo: string;
  cnpj: string;
  bosch_car_service: boolean;
  modulo_diagnostico_bosch: boolean;
  equipamento_bosch: boolean;
  atendimento_carros_premium: string;
  area_atuacao: string;
  em_dia_com_obrigacoes: boolean;
  categoria_empresa: string;
  afiliacao: boolean;
  situacao: string;
  createdAt: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

const NovosMembrosTable: React.FC = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [data, setData] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, current: 1 });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const filterOptions = [
    { label: 'Nome', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Situação', value: 'situacao' },
  ];

  const situacaoFilterOptions = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
    { label: 'Pendente', value: 'PENDENTE' },
  ];
  const [filterType, setFilterType] = useState<string>('name');
  const [situacaoFilterType, setSituacaoFilterType] = useState<string>('ATIVO');

  const [searchValue, setSearchValue] = useState<string>('');

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const startDate = dateRange?.[0]?.format('YYYY-MM-DD') || undefined;
      const endDate = dateRange?.[1]?.format('YYYY-MM-DD') || undefined;
      console.log(searchQuery, filterType);

      const obj: any = {};

      if (filterType === 'name') {
        obj.name = searchValue;
      }
      if (filterType === 'email') {
        obj.email = searchValue;
      }
      if (filterType === 'situacao') {
        obj.situacao = situacaoFilterType;
      }
      console.log(obj);
      const response = await fetchMembros(page, 10, startDate, endDate, { obj });
      setData(response.membros);
      setTotal(response.total);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.total,
      }));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current || 1);
  }, [pagination.current]);

  const handleTableChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
    setPagination({ ...pagination, current: pagination.current || 1 });
  };

  const handleSearch = () => {
    fetchData(1);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMembro(Number(id));
      toast({
        title: 'Membro excluído',
        description: 'O membro foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o membro.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const columns: TableColumnsType<DataType> = isMobile
    ? [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
        render: (text) => <span >{text}</span>,
      },
      // {
      //   title: 'Situação',
      //   dataIndex: 'situacao',
      //   key: 'situacao',
      //   render: (status: string) => {
      //     let color = '';
      //     switch (status) {
      //       case 'ativo':
      //         color = 'green';
      //         break;
      //       case 'inativo':
      //         color = 'red';
      //         break;
      //       case 'pendente':
      //         color = 'orange';
      //         break;
      //       default:
      //         color = 'gray';
      //     }
      //     return <Tag colorScheme={color} style={{ fontSize: '14px', fontWeight: 'bold' }}>{status}</Tag>;
      //   },
      // },
      {
        title: 'Ações',
        key: 'actions',
        render: (_, record) => (
          <Button variant={'ghost'} colorScheme='red' onClick={(e) => {
            e.stopPropagation();
            handleDelete(record.id);
          }}>
            <AiFillDelete />
          </Button>
        ),
      },
    ]
    : [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span >{reduzirTexto(text, 25)}</span>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span>{text}</span>,
      },
      {
        title: 'Empresa',
        dataIndex: 'nome_empresa',
        key: 'nome_empresa',
        sorter: (a, b) => a.nome_empresa.length - b.nome_empresa.length,
        sortOrder: sortedInfo.columnKey === 'nome_empresa' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span >{reduzirTexto(text, 25)}</span>,
      },
      {
        title: 'Criado',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
        ellipsis: true,
        render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
      },
      {
        title: 'Nível',
        dataIndex: 'nivel',
        key: 'nivel',
        render: (status: string) => {
          let color = '';
          switch (status) {
            case 'junior':
              color = 'orange';
              break;
            case 'associado':
              color = 'green';
              break;
            default:
              color = 'gray';
          }
          return <Tag  style={{width: "85px", justifyContent: 'center'}} colorScheme={color} >{status}</Tag>;
        },
      },
      {
        title: 'Situação',
        dataIndex: 'situacao',
        key: 'situacao',
        render: (status: string) => {
          let color = '';
          switch (status) {
            case 'ativo':
              color = 'green';
              break;
            case 'inativo':
              color = 'red';
              break;
            case 'pendente':
              color = 'orange';
              break;
            default:
              color = 'gray';
          }
          return <Tag  style={{width: "auto", justifyContent: 'center'}} colorScheme={color} >{status}</Tag>;
        },
      },
      {
        title: 'Ações',
        key: 'actions',
        render: (_, record) => (
          <Button variant={'ghost'} colorScheme='red' onClick={(e) => {
            e.stopPropagation();
            handleDelete(record.id);
          }}>
            <AiFillDelete />
          </Button>
        ),
      },
    ];

  return (
    <Box bg="white" borderRadius="xl" h={"90vh"} p={4}>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading className="heading-title" fontSize="2xl" fontWeight="bold">
          Membros
        </Heading>
      </Flex>

      <Flex mb={6} justify="flex-start" align="center" gap={isMobile ? 2 : 4} width="100%" flexWrap="wrap">
        <Select
          className="button-premium"
          options={filterOptions}
          value={filterType}
          onChange={setFilterType}
          style={{ width: isMobile ? "100%" : 180, height: "40px", color: "white" }}
        />
        {filterType === 'situacao' ? (
          <Select
            className="button-premium"
            options={situacaoFilterOptions}
            value={situacaoFilterType}
            onChange={setSituacaoFilterType}
            style={{ width: isMobile ? "100%" : 180, height: "40px" }}
          />
        ) : (
          <Input
            className="mecanicos-input"
            allowClear
            placeholder={`Buscar por ${filterOptions.find(opt => opt.value === filterType)?.label.toLowerCase()}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: isMobile ? "100%" : 240 }}
          />
        )}
        <DatePicker.RangePicker
          value={dateRange ? [dateRange[0], dateRange[1]] : null}
          onChange={(dates) => setDateRange(dates)}
          style={{ width: isMobile ? "100%" : 300 }}
          dropdownClassName="custom-dropdown"
          className="mecanicos-input"
          inputReadOnly={false}
        />
        <Button colorScheme="blue" className="button-premium" onClick={handleSearch} leftIcon={<AiOutlineSearch />} width={isMobile ? '100%' : 'auto'}>
          Buscar
        </Button>

        <Button
          className="button-premium"
          onClick={() => navigate('/main/create-membro')}
          colorScheme='green'
          fontSize='16px'
          fontWeight='bold'
          style={{ width: isMobile ? "100%" : 300 }}
        >
          Adicionar
        </Button>
      </Flex>

      <Box w="100%" maxW="100vw" overflowX="hidden">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          loading={loading}
          onChange={handleTableChange}
          pagination={{ ...pagination, total }}
          style={{ width: "100%" }}
          scroll={{ x: 'max-content', y: 550 }} // Ajustando o scroll horizontal
          onRow={(record) => ({
            onClick: () => navigate('/main/update-membro/' + record?.id),
            style: { cursor: 'pointer', minHeight: '70vh' },
          })}
        />
      </Box>

    </Box>
  );
};

export default NovosMembrosTable;