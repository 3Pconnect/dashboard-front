import React, { useState, useEffect } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps, Input, DatePicker, Select } from 'antd';
import { Heading, Flex, Button, useToast, Tag, useMediaQuery, HStack, Image, Box, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { fetchUsers, deleteUser, fetchMembros, deleteMembro, aprovarMembro, fetchEventos, deleteEvento, inscreverse } from '../services/api';
import dayjs, { Dayjs } from 'dayjs';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  urlImage: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

interface Sorts {
  columnKey?: string;
  order?: 'ascend' | 'descend';
}

const TodosEventosList: React.FC = () => {
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
      const response = await fetchEventos(page, 10, startDate, endDate, { obj });
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

  return (
    <>
      <Flex mb={6} justify='space-between' align='center' width='100%'>
        <Heading fontSize='2xl' fontWeight='bold'>Eventos</Heading>
        <Button
          onClick={() => navigate('/main/create-evento')}
          colorScheme='green'
          fontSize='16px'
          fontWeight='bold'
        >
          Adicionar
        </Button>
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
            className='button-premium'
            allowClear
            placeholder={`Buscar por ${filterOptions.find(opt => opt.value === filterType)?.label.toLowerCase()}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: isMobile ? "100%" : 240, height: "40px", backgroundColor: "transparent", color: "white", borderRadius: "0px", borderColor: "#2596be", borderWidth: "1px" }}
          />
        )}
        <DatePicker.RangePicker
          value={dateRange ? [dateRange[0], dateRange[1]] : null}
          onChange={(dates) => setDateRange(dates)}
          dropdownClassName="custom-dropdown"
          style={{ width: isMobile ? "100%" : 300, height: "40px", backgroundColor: "transparent", color: "white", borderRadius: "0px", borderColor: "#2596be", borderWidth: "1px" }}
          inputReadOnly={false}
        />
        <Button colorScheme="blue" onClick={handleSearch} leftIcon={<AiOutlineSearch />} width={isMobile ? '100%' : 'auto'} >
          Buscar
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {data.map(record => (
          <Box
            key={record.id}
            bg="#2D3748"
            color="white"
            borderRadius="lg"
            boxShadow="lg"
            p={4}
            width="100%"
          >
            <Image
              src={"https://i.ibb.co/8n8Gb6F0/Design-sem-nome.png"}
              borderRadius="md"
              mb={3}
              width={'100%'}
              objectFit={"cover"}
            />
            <VStack align="start" spacing={2}>
              <Text fontSize="lg" fontWeight="bold">
                {record.nome_evento}
              </Text>
              <Text fontSize="sm" color="gray.300">
                {record.cidade}, {record.estado}, {record?.dataEvento
                  ? format(new Date(record.dataEvento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                  : "Data indisponível"}
              </Text>
              <HStack mt={3} width="100%" justifyContent="space-between">
                <Button isDisabled={record.inscrito ? true : false} w={"full"}
                  colorScheme="blue" size="sm" onClick={() => {
                    const eventDetails = {
                      nome: record?.nome_evento,
                      dataInicio: new Date(record?.createdAt),
                      dataFim: new Date(record?.createdAt),
                      descricao: record?.tema,
                      local: record?.cidade + ", " + record?.estado,
                    };
                    handleIncreverSe(Number(record.id), eventDetails)
                  }}>
                  {record.inscrito ? "Inscrito" : "Inscreva-se"}
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default TodosEventosList;