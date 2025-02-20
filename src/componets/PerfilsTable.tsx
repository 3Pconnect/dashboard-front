import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, DatePicker } from 'antd';
import { Heading, Flex, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { fetchProfiles, deleteProfile } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';

interface DataType {
  id: number;
  name: string;
  createdAt: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

const PerfilsTable: React.FC = () => {
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

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const startDate = dateRange?.[0]?.format('YYYY-MM-DD') || undefined;
      const endDate = dateRange?.[1]?.format('YYYY-MM-DD') || undefined;
      const response = await fetchProfiles(page, pagination?.pageSize || 10, searchQuery, startDate, endDate);
      setData(response.profiles);
      setTotal(response.total);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.total,
      }));
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
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
      await deleteProfile(id);
      toast({
        title: 'Perfil excluído',
        description: 'O perfil foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o perfil.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{text}</span>,
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
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Flex onClick={() => navigate(`/main/update-perfil/${record.id}`)} style={{ cursor: 'pointer' }}>
          <Button variant={'ghost'} colorScheme='red' onClick={(e) => { e.stopPropagation(); handleDelete(record.id); }}>
            <AiFillDelete />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex mb={10} justify='space-between' align='center' width='100%'>
        <Heading fontSize='2xl' fontWeight='bold'>Perfis</Heading>
        <Button
          onClick={() => navigate('/main/create-perfil')}
          colorScheme='green'
          style={{ fontSize: '16px', fontWeight: 'bold' }}
        >
          Adicionar
        </Button>
      </Flex>

      <Flex mb={4} justify='flex-start' align='center' gap={4} width='100%'>
        <Input
          placeholder='Buscar por nome'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, height: 40, borderRadius: '8px', border: '1px solid #CBD5E0' }}
          allowClear
        />
        <DatePicker.RangePicker
          value={dateRange ? [dateRange[0], dateRange[1]] : null}
          onChange={(dates) => setDateRange(dates)}
          style={{ width: 250, height: 40 }}
        />
        <Button colorScheme='blue' onClick={handleSearch}>
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
          onClick: () => navigate(`/main/update-perfil/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />
    </>
  );
};

export default PerfilsTable;
