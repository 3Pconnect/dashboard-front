import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table, Tag } from 'antd';
import { Heading, Button as ButtonChakara, Flex } from '@chakra-ui/react';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Tech Solutions',
    role: 'Software Engineer',
    status: 'Ativo',
  },
  {
    key: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    company: 'Creative Labs',
    role: 'Project Manager',
    status: 'Inativo',
  },
  {
    key: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    company: 'Data Insights',
    role: 'Data Analyst',
    status: 'Pendente',
  },
  {
    key: '4',
    name: 'Emily White',
    email: 'emily.white@example.com',
    company: 'CloudTech',
    role: 'DevOps Engineer',
    status: 'Ativo',
  },
];

const NovosMembrosTable: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      sorter: (a, b) => a.company.length - b.company.length,
      sortOrder: sortedInfo.columnKey === 'company' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Cargo',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.length - b.role.length,
      sortOrder: sortedInfo.columnKey === 'role' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Situação',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'Ativo':
            color = 'green';
            break;
          case 'Inativo':
            color = 'red';
            break;
          case 'Pendente':
            color = 'orange';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl">Novos Membros</Heading>
        <ButtonChakara colorScheme="green" variant="solid">
          Adicionar
        </ButtonChakara>
      </Flex>
      <Table<DataType> columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default NovosMembrosTable;
