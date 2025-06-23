import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, DatePicker, Select } from 'antd';
import { Heading, Flex, Button, useToast, Tag, useMediaQuery, HStack, Box} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { fetchEventos, deleteEvento, inscreverse, fetchMeusEventos } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';
import { truncateString } from '../utils/util';

interface DataType {
  id: string;
  nome_evento: string;
  cidade: string;
  estado: string;
  tema: string;
  createdAt: string;
  situacao: string;
  inscrito: boolean;
  dataEvento: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

const MeusEventosTable: React.FC = () => {
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
    { label: 'Nome', value: 'nome_evento' },
    { label: 'Tema', value: 'tema' },
  ];

  const situacaoFilterOptions = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
    { label: 'Pendente', value: 'PENDENTE' },
  ];
  const [filterType, setFilterType] = useState<string>('nome_evento');
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

      if (filterType === 'nome_evento') {
        obj.nome_evento = searchValue;
      }
      if (filterType === 'tema') {
        obj.tema = searchValue;
      }
      if (filterType === 'situacao') {
        obj.situacao = situacaoFilterType;
      }
      console.log(obj);
      const response = await fetchMeusEventos(page, 10, startDate, endDate, { obj });
      console.log(response);
      setData(response?.eventos);
      setTotal(response?.total);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response?.total,
      }));
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  const redirectToGoogleCalendar = (eventDetails: any) => {
    const { nome, dataInicio, dataFim, descricao, local } = eventDetails;
    const start = dataInicio.toISOString().replace(/[-:]/g, "").split(".")[0];
    const end = dataFim.toISOString().replace(/[-:]/g, "").split(".")[0];

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nome)}&dates=${start}/${end}&details=${encodeURIComponent(descricao)}&location=${encodeURIComponent(local)}`;

    setTimeout(() => {
      window.open(googleCalendarUrl, '_blank');
    }, 3000);
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
      await deleteEvento(Number(id));
      toast({
        title: 'Evento excluído',
        description: 'O evento foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o evento.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleIncreverSe = async (id: number, eventDetails: any) => {
    try {
      await inscreverse(Number(id));
      toast({
        title: 'Incrição feita.',
        description: 'A inscrição ao evento foi concluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      redirectToGoogleCalendar(eventDetails);
      fetchData(pagination.current || 1);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível efetuar a inscrição ao evento.',
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
          dataIndex: 'nome_evento',
          key: 'nome_evento',
          ellipsis: true,
          render: (text) => <span>{truncateString(text, 10)}</span>,
        },
        // {
        //   title: 'Estado',
        //   dataIndex: 'estado',
        //   key: 'estado',
        //   ellipsis: true,
        //   render: (text) => <span style={{ fontSize: '14px' }}>{text}</span>,
        // },
        {
          title: 'Ações',
          key: 'actions',
          render: (_, record) => (
            <HStack justifyContent={"center"}>
              <Button isDisabled={true} variant={'ghost'} colorScheme='blue' onClick={(e) => {
                e.stopPropagation();
                const eventDetails = {
                  nome: record?.nome_evento,
                  dataInicio: new Date(record?.createdAt),
                  dataFim: new Date(record?.createdAt),
                  descricao: record?.tema,
                  local: record?.cidade + ", " + record?.estado,
                };
                handleIncreverSe(Number(record.id), eventDetails);
              }}>
                Inscrito
              </Button>
            </HStack>
          ),
        },
      ]
    : [
        {
          title: 'Nome',
          dataIndex: 'nome_evento',
          key: 'nome_evento',
          sorter: (a, b) => a.nome_evento.length - b.nome_evento.length,
          sortOrder: sortedInfo.columnKey === 'nome_evento' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span >{text}</span>,
        },
        {
          title: 'Cidade',
          dataIndex: 'cidade',
          key: 'cidade',
          sorter: (a, b) => a.cidade.length - b.cidade.length,
          sortOrder: sortedInfo.columnKey === 'cidade' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span >{text}</span>,
        },
        {
          title: 'Estado',
          dataIndex: 'estado',
          key: 'estado',
          sorter: (a, b) => a.estado.length - b.estado.length,
          sortOrder: sortedInfo.columnKey === 'estado' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span>{text}</span>,
        },
        {
          title: 'Tema',
          dataIndex: 'tema',
          key: 'tema',
          sorter: (a, b) => a.tema.length - b.tema.length,
          sortOrder: sortedInfo.columnKey === 'tema' ? sortedInfo.order : null,
          ellipsis: true,
          render: (text) => <span>{text}</span>,
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
          title: 'Evento',
          dataIndex: 'createdAt',
          key: 'dataEvento',
          sorter: (a, b) => new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime(),
          sortOrder: sortedInfo.columnKey === 'dataEvento' ? sortedInfo.order : null,
          ellipsis: true,
          render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
        },
        {
          title: 'Situação',
          dataIndex: 'situacao',
          key: 'situacao',
          render: (status: string) => {
            let color = '';
            switch (status) {
              case 'ativo':
                color = 'green';
                break;
              case 'inativo':
                color = 'red';
                break;
              case 'pendente':
                color = 'orange';
                break;
              default:
                color = 'gray';
            }
            return <Tag colorScheme={color}>{status}</Tag>;
          },
        },
        {
          title: 'Ações',
          key: 'actions',
          render: (_, record) => (
            <HStack justifyContent={"center"}>
              <Button isDisabled={true} variant={'ghost'} colorScheme='blue' onClick={(e) => {
                e.stopPropagation();
                const eventDetails = {
                  nome: record?.nome_evento,
                  dataInicio: new Date(record?.createdAt),
                  dataFim: new Date(record?.createdAt),
                  descricao: record?.tema,
                  local: record?.cidade + ", " + record?.estado,
                };
                handleIncreverSe(Number(record.id), eventDetails);
              }}>
                Inscrito
              </Button>
            </HStack>
          ),
        },
      ];

  return (
    <Box  className="text-color" bg="white" borderRadius="xl" h={"90vh"} p={4}>
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading className='heading-title' fontSize='2xl' >Meus eventos</Heading>
      </Flex>

      <Flex mb={6} justify="flex-start" align="center" gap={isMobile ? 2 : 4} width="100%" flexWrap="wrap">
        <Select
          className="button-premium"
          options={filterOptions}
          value={filterType}
          onChange={setFilterType}
          style={{ width: isMobile ? "100%" : 280, height: "40px", color: "white" }}
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
            style={{ height: "40px", width: isMobile ? "100%" : 240, backgroundColor: "transparent", color: "white", borderRadius: "0px", borderColor: "#2596be", borderWidth: "1px" }}
          />
        )}
        <DatePicker.RangePicker
          value={dateRange ? [dateRange[0], dateRange[1]] : null}
           className="mecanicos-input"
          onChange={(dates) => setDateRange(dates)}
          dropdownClassName="custom-dropdown"
          style={{ width: isMobile ? "100%" : 300, height: "40px", backgroundColor: "transparent", color: "white", borderRadius: "0px", borderColor: "#2596be", borderWidth: "1px" }}
          inputReadOnly={false}
        />
        <Button  className="button-premium" colorScheme="blue" onClick={handleSearch} leftIcon={<AiOutlineSearch />} width={isMobile ? '100%' : 'auto'}>
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
            // navigate('/main/update-membro/'+record?.id)
          },
          style: { cursor: 'pointer', minHeight: '70vh' }
        })}
      />
    </Box>
  );
};

export default MeusEventosTable;