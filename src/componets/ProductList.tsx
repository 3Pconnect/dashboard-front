import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, Tag } from 'antd';
import { Heading, Flex, useToast, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { deleteProduto, fetchProducts } from '../services/api';

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

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [data, setData] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, current: 1 });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const toast = useToast();

  const [searchValue, setSearchValue] = useState<string>('');

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
  const handleDelete = async (id: string) => {
    try {
      await deleteProduto(id);
      toast({
        title: 'Produto excluído',
        description: 'O Produto foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o Produto.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData(pagination.current || 1);
  }, [pagination.current, searchValue]);

  const handleTableChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
    setPagination({ ...pagination, current: pagination.current || 1 });
  };

  const handleSearch = () => {
    fetchData(1);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      sortOrder: sortedInfo.columnKey === 'nome' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      ellipsis: true,
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco) => `R$ ${parseFloat(preco).toFixed(2)}`,
    },
    // {
    //   title: 'Ações',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Button variant={'ghost'} colorScheme='blue' onClick={() => navigate(`/main/update-product/${record.id}`)}>
    //       Editar
    //     </Button>
    //   ),
    // },
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
        <Heading className='heading-title' fontSize='2xl' fontWeight='bold'>Produtos</Heading>
        <Button
          className='button-premium'
          onClick={() => navigate('/main/create-product')}
          colorScheme='green'
          fontSize='16px'
          fontWeight='bold'
        >
          Adicionar
        </Button>
      </Flex>
      <Flex mb={6} justify="flex-start" align="center" gap={4} width="100%">
        {/* Input único para busca */}
        <Input
          className='button-premium'
          allowClear
          placeholder="Buscar por nome"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            height: "40px", width: 240,
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "0px", borderColor: "#2596be",
            borderWidth: "1px"
          }}
        />
        {/* Botão de busca */}
        <Button className='button-premium' colorScheme="blue" onClick={handleSearch} leftIcon={<AiOutlineSearch />}>
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
          onClick: () => {
            
          },
          style: { cursor: 'pointer' }
        })}
      />
    </>
  );
};

export default ProductList;
