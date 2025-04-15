import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import { Heading, Flex, Button, useToast, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, useBreakpointValue, Tag } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { fetchInteressadosCompra } from '../services/api';

interface DataType {
  username: string;
  email: string;
  dataInteresse: string;
  quantidade: number;
  pago: boolean
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;

const UserInterestedList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, current: 1 });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const toast = useToast();
  const { id } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchInteressadosCompra(Number(id), page, pagination?.pageSize || 10);

      const formattedData: DataType[] = response.data.map((item: any) => ({
        username: item.usuario.username,
        email: item.usuario.email,
        dataInteresse: item.dataInteresse,
        quantidade: item.quantidade,
        pago: item?.pago
      }));

      setData(formattedData);
      setTotal(response.total);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.total,
      }));
    } catch (error) {
      console.error('Erro ao buscar interessados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current || 1);
  }, [pagination.current, id]);

  const handleTableChange: OnChange = (pagination) => {
    setPagination({ ...pagination, current: pagination.current || 1 });
  };

  const desktopColumns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'username',
      key: 'username',
    },
    
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Situação',
      dataIndex: 'pago',
      key: 'pago',
      sorter: (a:any, b:any) => a.pago - b.pago,
      render: (pago: string) => {
        let color = 'gray';
        if (pago) {
          color = 'green';
        } else if (!pago) {
          color = 'red';
        }
        return <Tag colorScheme={color}>{pago ? "pago": "pagamento_pendente"}</Tag>;
      },},
    {
      title: 'Data Interesse',
      dataIndex: 'dataInteresse',
      key: 'dataInteresse',
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
  ];

    const mobileColumns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
  ];

  return (
    <>
      <Flex mb={6} justify="space-between" align="center" width="100%">
        <Heading className="heading-title" fontSize="2xl" fontWeight="bold">
          Interessados
        </Heading>
      </Flex>
      <Flex direction={{ base: 'column', md: 'row' }} mb={10} justify="space-between" align="center" width="100%">
        <Flex align="center" mb={{ base: 2, md: 0 }}>
          <Button colorScheme="white" variant="ghost" leftIcon={<Icon as={MdArrowBack} />} mr={{ base: 0, md: 4 }} onClick={() => window.history.back()}>
            Voltar
          </Button>
          {!isMobile && (
            <Breadcrumb display={{ base: 'none', md: 'flex' }}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/cadastro">Compras Coletivas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Interessados</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
        </Flex>
      </Flex>

      <Table<DataType>
        columns={isMobile ? mobileColumns : desktopColumns}
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
        pagination={{ ...pagination, total }}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default UserInterestedList;