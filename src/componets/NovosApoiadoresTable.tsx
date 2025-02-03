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
  cnpj: string;
  email: string;
  phone: string;
  activity: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'Empresa Alpha',
    cnpj: '12.345.678/0001-99',
    email: 'contato@alpha.com.br',
    phone: '(11) 98765-4321',
    activity: 'Tecnologia',
  },
  {
    key: '2',
    name: 'Beta Consultoria',
    cnpj: '98.765.432/0001-11',
    email: 'financeiro@beta.com.br',
    phone: '(21) 99876-5432',
    activity: 'Consultoria',
  },
  {
    key: '3',
    name: 'Gamma Solutions',
    cnpj: '22.334.556/0001-88',
    email: 'vendas@gammasolutions.com',
    phone: '(31) 91234-5678',
    activity: 'Desenvolvimento de Software',
  },
];

const NovosApoiadoresTable: React.FC = () => {
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
          title: 'Atividade',
          dataIndex: 'activity',
          key: 'activity',
          sorter: (a, b) => a.activity.length - b.activity.length,
          sortOrder: sortedInfo.columnKey === 'activity' ? sortedInfo.order : null,
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
          title: 'CNPJ',
          dataIndex: 'cnpj',
          key: 'cnpj',
          sorter: (a, b) => a.cnpj.localeCompare(b.cnpj),
          sortOrder: sortedInfo.columnKey === 'cnpj' ? sortedInfo.order : null,
          ellipsis: true,
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          sorter: (a, b) => a.email.length - b.email.length,
          sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
          ellipsis: true,
        },
        {
          title: 'Telefone',
          dataIndex: 'phone',
          key: 'phone',
          sorter: (a, b) => a.phone.localeCompare(b.phone),
          sortOrder: sortedInfo.columnKey === 'phone' ? sortedInfo.order : null,
          ellipsis: true,
        },
        {
          title: 'Atividade',
          dataIndex: 'activity',
          key: 'activity',
          sorter: (a, b) => a.activity.length - b.activity.length,
          sortOrder: sortedInfo.columnKey === 'activity' ? sortedInfo.order : null,
          ellipsis: true,
        },
      ];

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl">Apoiadores</Heading>
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

export default NovosApoiadoresTable;
