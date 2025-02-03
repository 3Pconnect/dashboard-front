import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';
import { Heading, Button as ButtonChakara, Flex } from '@chakra-ui/react';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  registered: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'Super Admin',
    registered: '2023-01-15',
  },
  {
    key: '2',
    name: 'Admin',
    registered: '2022-06-22',
  },
  {
    key: '3',
    name: 'Associado',
    registered: '2021-12-11',
  },
  {
    key: '4',
    name: 'Apoiador',
    registered: '2023-04-30',
  },
];

const PerfilsTable: React.FC = () => {
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
      title: 'Cadastrado em',
      dataIndex: 'registered',
      key: 'registered',
      sorter: (a, b) => new Date(a.registered).getTime() - new Date(b.registered).getTime(),
      sortOrder: sortedInfo.columnKey === 'registered' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl">Perfis</Heading>
        <ButtonChakara colorScheme="green" variant="solid">
          Adicionar
        </ButtonChakara>
      </Flex>
      <Table<DataType> columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default PerfilsTable;
