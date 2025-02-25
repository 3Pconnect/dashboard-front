import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, DatePicker, Select } from 'antd';
import { Heading, Flex, Button, useToast, Tag } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { fetchUsers, deleteUser } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';


interface DataType {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  situacao: string;
  profile: { name: string };
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

const TableUsers: React.FC = () => {
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

  const filterOptions = [
    { label: 'Nome', value: 'username' },
    { label: 'Email', value: 'email' },
    { label: 'Perfil', value: 'profile' },
    { label: 'Situação', value: 'situacao' },
  ];

  const situacaoFilterOptions = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
    { label: 'Pendente', value: 'PENDENTE' },
  ];
  const [filterType, setFilterType] = useState<string>('username');
  const [situacaoFilterType, setSituacaoFilterType] = useState<string>('ATIVO');

  const [searchValue, setSearchValue] = useState<string>('');


  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const startDate = dateRange?.[0]?.format('YYYY-MM-DD') || undefined;
      const endDate = dateRange?.[1]?.format('YYYY-MM-DD') || undefined;
      console.clear()
      console.log(searchQuery, filterType)

      const filterOptions = [
        { label: 'Nome', value: 'username' },
        { label: 'Email', value: 'email' },
        { label: 'Perfil', value: 'profile' },
        { label: 'Situação', value: 'situacao' },
      ];
      const obj:any = {

      }

      if(filterType === 'username'){
        obj.name = searchValue
      }
      if(filterType === 'email'){
        obj.email = searchValue
      }
      if(filterType === 'profile'){
        obj.profile = searchValue
      }
      if(filterType === 'situacao'){
        obj.situacao = situacaoFilterType
      }
      console.log(obj)
      // Passar searchQuery e dateRange dentro de filters
      const response = await fetchUsers(page, pagination?.pageSize || 10, { obj, startDate, endDate });
      setData(response.users);
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

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
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
      title: 'Situação',
      dataIndex: 'situacao',
      key: 'situacao',
      render: (status: string) => {
        let color = 'gray';
        if (status === 'ATIVO') {
          color = 'green';
        } else if (status === 'INATIVO') {
          color = 'red';
        } else if (status === 'PENDENTE') {
          color = 'orange';
        }
        return <Tag colorScheme={color}>{status.toLocaleLowerCase()}</Tag>
      },
      filters: [
        { text: 'Ativo', value: 'ATIVO' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'Pending', value: 'Pending' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.situacao.includes(value as string),
    },
    {
      title: 'Perfil',
      dataIndex: 'profile',
      key: 'profile',
      render: (profile: { name: string }) => <span>{profile?.name}</span>, // Acessando o nome do perfil
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Button variant={'ghost'} colorScheme='red' onClick={(e) => {
          e.stopPropagation();
          handleDelete(record.id)
        }}>
          <AiFillDelete />
        </Button>
      ),
    },
  ];


  return (
    <>
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading fontSize='2xl' fontWeight='bold'>Usuários</Heading>
        <Button
          onClick={() => navigate('/main/create-user')}
          colorScheme='green'
          fontSize='16px'
          fontWeight='bold'
        >
          Adicionar
        </Button>
      </Flex>
      <Flex mb={6} justify="flex-start" align="center" gap={4} width="100%">
  {/* Select para escolher o tipo de filtro */}
  <Select
    options={filterOptions}
    value={filterType}
    onChange={setFilterType}
    style={{ width: 180, height: "40px" }}
  />

  {/* Input único para busca */}
{
  filterType === 'situacao' ?
  <Select
    options={situacaoFilterOptions}
    value={situacaoFilterType}
    onChange={setSituacaoFilterType}
    style={{ width: 180, height: "40px" }}
  />
  :
  <Input
  allowClear
    placeholder={`Buscar por ${filterOptions.find(opt => opt.value === filterType)?.label.toLowerCase()}`}
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    style={{ height: "40px", width: 240 }}
  />

}




  {/* Filtro por data */}
  <DatePicker.RangePicker
    value={dateRange ? [dateRange[0], dateRange[1]] : null}
    onChange={(dates) => setDateRange(dates)}
    style={{ width: 300, height: "40px" }}
  />

  {/* Botão de busca */}
  <Button colorScheme="blue" onClick={handleSearch} leftIcon={<AiOutlineSearch />}>
    Buscar
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
          onClick: () =>{
            navigate('/main/update-user/'+record?.id)
          },
          style: { cursor: 'pointer' }
        })}
      />
    </>
  );
};

export default TableUsers;