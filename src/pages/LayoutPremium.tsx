import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    CalendarOutlined,
    FileOutlined,
  } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;



const LayoutPremium: React.FC = () => {
    const items = [
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'Dashboard',
          onClick: ()=> {
            navigate('/main/dashboard')
          }
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
      ]
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "60vh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutPremium;