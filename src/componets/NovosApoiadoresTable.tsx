import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, DatePicker, Select } from 'antd';
import { Heading, Flex, Button, useToast, useMediaQuery, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { fetchUsers, deleteUser, fetchMembros, deleteMembro, fetchApoiadores } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';

interface DataType {
  id: number;
  name: string;
  tipo_usuario: string;
  email: string;
  telefone: string;
  nome_empresa: string;
  cnpj: string;
  area_atuacao: string;
  categoria_empresa: string;
  createdAt: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

const NovosApoiadoresTable: React.FC = () => {
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
    { label: 'CNPJ', value: 'cnpj' },
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
      console.clear();
      console.log(searchQuery, filterType);

      const obj: any = {};

      if (filterType === 'name') {
        obj.name = searchValue;
      }
      if (filterType === 'email') {
        obj.email = searchValue;
      }
      if (filterType === 'cnpj') {
        obj.cnpj = searchValue;
      }
      console.log(obj);
      const response = await fetchApoiadores(page, 10, startDate, endDate, { obj });
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
        title: 'Apoiador excluído',
        description: 'O apoiador foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o apoiador.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const columns: TableColumnsType<DataType> = isMobile
    ? [
      {
        title: 'Nome',
        dataIndex: 'nome_empresa',
        key: 'nome_empresa',
        ellipsis: true,
        render: (text) => <span>{text}</span>,
      },
      // {
      //   title: 'E-mail',
      //   dataIndex: 'email',
      //   key: 'email',
      //   ellipsis: true,
      //   render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
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
        dataIndex: 'nome_empresa',
        key: 'nome_empresa',
        sorter: (a, b) => a.nome_empresa.length - b.nome_empresa.length,
        sortOrder: sortedInfo.columnKey === 'nome_empresa' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span >{text}</span>,
      },
      {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
        sorter: (a, b) => a.cnpj.localeCompare(b.cnpj),
        sortOrder: sortedInfo.columnKey === 'cnpj' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span >{text}</span>,
      },
      {
        title: 'Cadastrado em',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
        ellipsis: true,
        render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span >{text}</span>,
      },
      {
        title: 'Telefone',
        dataIndex: 'telefone',
        key: 'telefone',
        sorter: (a, b) => a.telefone.localeCompare(b.telefone),
        sortOrder: sortedInfo.columnKey === 'telefone' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span >{text}</span>,
      },
      {
        title: 'Atividade',
        dataIndex: 'area_atuacao',
        key: 'area_atuacao',
        sorter: (a, b) => a.area_atuacao.length - b.area_atuacao.length,
        sortOrder: sortedInfo.columnKey === 'area_atuacao' ? sortedInfo.order : null,
        ellipsis: true,
        render: (text) => <span>{text}</span>,
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
    <Box className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4} >
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading className='heading-title' fontSize='2xl' >Apoiadores</Heading>
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
            style={{ height: "40px", width: isMobile ? "100%" : 248, backgroundColor: "transparent", color: "white", borderRadius: "0px", borderColor: "#2596be", borderWidth: "1px" }}
          />
        )}
        <DatePicker.RangePicker
        className="mecanicos-input"
          value={dateRange ? [dateRange[0], dateRange[1]] : null}
          onChange={(dates) => setDateRange(dates)}
          dropdownClassName="custom-dropdown"
          style={{ width: isMobile ? "100%" : 300, height: "40px", backgroundColor: "transparent", color: "white", borderRadius: "0px", borderColor: "#2596be", borderWidth: "1px" }}
          inputReadOnly={false}
        />
        <Button
                 style={{ width: isMobile ? "100%" : 180,}}
        className="button-premium" colorScheme="blue" onClick={handleSearch} leftIcon={<AiOutlineSearch />} width={isMobile ? '100%' : 'auto'}>
          Buscar
        </Button>
        <Button
          style={{ width: isMobile ? "100%" : 180,}}
         className="button-premium"
          onClick={() => navigate('/main/create-apoiador')}
          colorScheme='green'
          fontSize='16px'
          fontWeight='bold'
        >
          Adicionar
        </Button>
      </Flex>

      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
        pagination={{ ...pagination, total }}
        scroll={{ x: 'max-content' }}
        onRow={(record) => ({
          onClick: () => {
            navigate('/main/update-apoiador/' + record?.id);
          },
          style: { cursor: 'pointer' }
        })}
      />
    </Box>
  );
};

export default NovosApoiadoresTable;