import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  Box,
  Button,
  Heading,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import {
  getUsuariosDoEvento,
  sendCertificadoPorEmail,
} from '../../services/api'; // ajuste o caminho conforme necessário
import { useParams } from 'react-router-dom';

interface UserType {
  id: number;
  username: string;
  email: string;
  uid: string;
}

const UserList: React.FC = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast(); // <-- Chakra toast
  const { id } = useParams<{ id: string }>();
  const [sendingIds, setSendingIds] = useState<Set<number>>(new Set());


  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const usuarios = await getUsuariosDoEvento(Number(id));
        setData(usuarios);
      } catch (err: any) {
        toast({
          title: 'Erro ao carregar usuários.',
          description: err.message || 'Tente novamente mais tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

const confirmarPresenca = async (usuario: UserType) => {
  setSendingIds((prev) => new Set(prev).add(usuario.id));

  try {
    await sendCertificadoPorEmail(usuario.email);
    toast({
      title: 'Certificado enviado!',
      description: `Presença confirmada para ${usuario.username}.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (error: any) {
    toast({
      title: 'Erro ao confirmar presença.',
      description: `Não foi possível enviar para ${usuario.username}: ${error.message}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setSendingIds((prev) => {
      const updated = new Set(prev);
      updated.delete(usuario.id);
      return updated;
    });
  }
};


  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
<Button
  colorScheme="blue"
  size="sm"
  onClick={() => confirmarPresenca(record)}
  isLoading={sendingIds.has(record.id)}
>
  Confirmar presença e enviar certificado
</Button>
      ),
    },
  ];

  return (
    <Box bg="white" p={4} borderRadius="xl" h="90vh" overflow="auto">
      <Heading color="black" fontSize="2xl" mb={6}>
        Inscritos ao evento ({id})
      </Heading>
      <Table<UserType>
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        scroll={{ x: isMobile ? 600 : undefined }}
      />
    </Box>
  );
};

export default UserList;
