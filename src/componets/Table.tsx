import React, { useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table, Tag } from 'antd';
import { Heading, Button as ButtonChakra, Flex, Box } from '@chakra-ui/react';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  email: string;
  registered: string;
  status: string;
  profiles: string[];
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'john.brown@example.com',
    registered: '2023-01-15',
    status: 'Active',
    profiles: ['Admin', 'User'],
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'jim.green@example.com',
    registered: '2022-06-22',
    status: 'Inactive',
    profiles: ['User'],
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'joe.black@example.com',
    registered: '2021-12-11',
    status: 'Active',
    profiles: ['User'],
  },
  {
    key: '4',
    name: 'Jim Red',
    email: 'jim.red@example.com',
    registered: '2023-04-30',
    status: 'Pending',
    profiles: ['Admin'],
  },
];

const TableUsers: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<DataType> = isMobile
    ? [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
          sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
          ellipsis: true,
        },
        {
          title: 'Situação',
          dataIndex: 'status',
          key: 'status',
          render: (status: string) => {
            let color = 'gray';
            if (status === 'Active') {
              color = 'green';
            } else if (status === 'Inactive') {
              color = 'red';
            } else if (status === 'Pending') {
              color = 'orange';
            }
            return <Tag color={color}>{status}</Tag>;
          },
          filters: [
            { text: 'Active', value: 'Active' },
            { text: 'Inactive', value: 'Inactive' },
            { text: 'Pending', value: 'Pending' },
          ],
          filteredValue: filteredInfo.status || null,
          onFilter: (value, record) => record.status.includes(value as string),
          sorter: (a, b) => a.status.length - b.status.length,
          sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
          ellipsis: true,
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
          title: 'Cadastrado em',
          dataIndex: 'registered',
          key: 'registered',
          sorter: (a, b) => new Date(a.registered).getTime() - new Date(b.registered).getTime(),
          sortOrder: sortedInfo.columnKey === 'registered' ? sortedInfo.order : null,
          ellipsis: true,
        },
        {
          title: 'Situação',
          dataIndex: 'status',
          key: 'status',
          render: (status: string) => {
            let color = 'gray';
            if (status === 'Active') {
              color = 'green';
            } else if (status === 'Inactive') {
              color = 'red';
            } else if (status === 'Pending') {
              color = 'orange';
            }
            return <Tag color={color}>{status}</Tag>;
          },
          filters: [
            { text: 'Active', value: 'Active' },
            { text: 'Inactive', value: 'Inactive' },
            { text: 'Pending', value: 'Pending' },
          ],
          filteredValue: filteredInfo.status || null,
          onFilter: (value, record) => record.status.includes(value as string),
          sorter: (a, b) => a.status.length - b.status.length,
          sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
          ellipsis: true,
        },
        {
          title: 'Perfis',
          dataIndex: 'profiles',
          key: 'profiles',
          render: (profiles: string[]) => profiles.join(', '),
        },
      ];

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl">Usuários</Heading>
        <ButtonChakra colorScheme="green" variant="solid">
          Adicionar
        </ButtonChakra>
      </Flex>

      <Box overflowX="auto">
        <Table<DataType> columns={columns} dataSource={data} onChange={handleChange} />
      </Box>
    </>
  );
};

export default TableUsers;
