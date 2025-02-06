import React, { useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table, Tag, Button } from 'antd';
import { Heading, Button as ButtonChakra, Flex, Box } from '@chakra-ui/react';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  nomeEvento: string;
  cidade: string;
  estado: string;
  tema: string;
  data: string;
  situacao: string;
}

const data: DataType[] = [
  {
    key: '1',
    nomeEvento: 'Tech Conference 2025',
    cidade: 'São Paulo',
    estado: 'SP',
    tema: 'Tecnologia e Inovação',
    data: '2025-03-15',
    situacao: 'Ativo',
  },
  {
    key: '2',
    nomeEvento: 'Marketing Summit 2025',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    tema: 'Marketing Digital',
    data: '2025-04-10',
    situacao: 'Inativo',
  },
  {
    key: '3',
    nomeEvento: 'Design Expo 2025',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    tema: 'Design e Criatividade',
    data: '2025-05-22',
    situacao: 'Pendente',
  },
  {
    key: '4',
    nomeEvento: 'Data Science Symposium 2025',
    cidade: 'Curitiba',
    estado: 'PR',
    tema: 'Ciência de Dados',
    data: '2025-06-10',
    situacao: 'Ativo',
  },
];

const MeusEventosTable: React.FC = () => {
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
          title: 'Nome do Evento',
          dataIndex: 'nomeEvento',
          key: 'nomeEvento',
          sorter: (a, b) => a.nomeEvento.length - b.nomeEvento.length,
          sortOrder: sortedInfo.columnKey === 'nomeEvento' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{text}</span>,
        },
        {
          title: 'Situação',
          dataIndex: 'situacao',
          key: 'situacao',
          render: (situacao: string) => {
            let color = '';
            switch (situacao) {
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
            return (
              <Tag color={color} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {situacao}
              </Tag>
            );
          },
        },
        {
          title: 'Ações',
          key: 'acoes',
          render: () => <Button type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', fontSize: '14px', padding: '6px 20px' }}>Inscrever-se</Button>,
        },
      ]
    : [
        {
          title: 'Nome do Evento',
          dataIndex: 'nomeEvento',
          key: 'nomeEvento',
          sorter: (a, b) => a.nomeEvento.length - b.nomeEvento.length,
          sortOrder: sortedInfo.columnKey === 'nomeEvento' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{text}</span>,
        },
        {
          title: 'Cidade',
          dataIndex: 'cidade',
          key: 'cidade',
          sorter: (a, b) => a.cidade.length - b.cidade.length,
          sortOrder: sortedInfo.columnKey === 'cidade' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
        },
        {
          title: 'Estado',
          dataIndex: 'estado',
          key: 'estado',
          sorter: (a, b) => a.estado.length - b.estado.length,
          sortOrder: sortedInfo.columnKey === 'estado' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
        },
        {
          title: 'Tema',
          dataIndex: 'tema',
          key: 'tema',
          sorter: (a, b) => a.tema.length - b.tema.length,
          sortOrder: sortedInfo.columnKey === 'tema' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
        },
        {
          title: 'Data',
          dataIndex: 'data',
          key: 'data',
          sorter: (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
          sortOrder: sortedInfo.columnKey === 'data' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
        },
        {
          title: 'Situação',
          dataIndex: 'situacao',
          key: 'situacao',
          render: (situacao: string) => {
            let color = '';
            switch (situacao) {
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
            return (
              <Tag color={color} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {situacao}
              </Tag>
            );
          },
        },
      ];

  return (
    <>
      <Flex mb={10} justify="space-between" align="center" width="100%">
        <Heading fontSize="2xl" style={{ fontWeight: 'bold' }}>Meus Eventos</Heading>
     
      </Flex>
      <Box overflowX="auto">
        <Table<DataType> columns={columns} dataSource={data} onChange={handleChange} pagination={{ pageSize: 5 }} />
      </Box>
    </>
  );
};

export default MeusEventosTable;
