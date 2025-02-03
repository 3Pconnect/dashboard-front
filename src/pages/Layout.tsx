import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';  // Importa o Outlet
import { Profile } from '../componets/Profile';

const { Header, Sider, Content } = Layout;

const LayoutApp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <HStack>
        <Image m={5} w={"30px"}
          src='https://mecanicospremium.com.br/build/assets/logo-e787336c.png'/>
          {!collapsed && 
          <Heading color={"#182433"} fontSize="md">Mecânicos Premium</Heading>
          }
          
        </HStack>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Cadastros',
              children: [
                {
                  key: '2.1',
                  label: 'Usuários',
                  onClick: ()=> {
                    navigate('/main/users')
                  }
                },
                {
                  key: '2.2',
                  label: 'Perfis',
                  onClick: ()=> {
                    navigate('/main/perfis')
                  }
                },
                {
                  key: '2.3',
                  label: 'Novos Membros',
                  onClick: ()=> {
                    navigate('/main/novos-membros')
                  }
                },
                {
                  key: '2.4',
                  label: 'Novos Parceiros',
                  onClick: ()=> {
                    navigate('/main/apoiadores')
                  }
                },
              ],
            },
            {
              key: '3',
              icon: <CalendarOutlined />,
              label: 'Eventos',
              children: [
                {
                  key: '3.1',
                  label: 'Agenda de Eventos',
                },
                {
                  key: '3.2',
                  label: 'Meus Eventos',
                },
              ],
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Arquivos',
              onClick: ()=> {
                alert("ndndnn")
              }
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>

           <Flex mb={10} justify="space-between" align="center" width="100%">
           <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Profile/>
        </Flex>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* Onde as rotas vão ser renderizadas */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
