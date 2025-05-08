import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import ProtectedRoute from "./componets/ProtectedRoute";
import { PostProvider } from "./contexts/PostContext";
import Feed from "./pages/Feed";
import { FeedProvider } from "./contexts/FeedContext";
import NewLogin from "./pages/NewLogin";
import Page from "./pages/AppShell";
import LayoutApp from "./pages/Layout";
import TableUsers from "./componets/Table";
import { UserList } from "./pages/UsersList";
import { PerfilsList } from "./pages/PerfilsList";
import { NovosMembrosList } from "./pages/NovosMembrosList";
import { NovosParceirosList } from "./pages/NovosParceirosList";
import DashboardMain from "./pages/DashboardMain";
import LayoutPremium from "./pages/LayoutPremium";
import { AgendaEventosList } from "./pages/AgendaEventosList";
import { MeusEventosList } from "./pages/MeusEventosList";
import { CreateUserPage } from "./pages/CreateUserPage";
import { CreatePerfilPage } from "./pages/CreatePerfilPage";
import { CreateNovosMembrosPage } from "./pages/CreateNovosMembrosPage";
import { CreateNovosApoadoresPage } from "./pages/CreateNovosApoiadoresPage";
import { CreateNovoEvento } from "./componets/CreateNovoEvento";
import HeaderComponent from "./pages/Site";
import Enfermeira from "./pages/Enfermeira";
import { UpdatePerfilPage } from "./pages/UpdatePerfilPage";
import { UpdateUserPage } from "./pages/UpdateUserPage";
import { UpdateMembroPage } from "./pages/UpdateMembroPage";
import { UpdateApoiadorPage } from "./pages/UpdateApoiadorPage";
import Out from "./pages/Out";
import { useState, useEffect } from "react";
import { fetchMe } from "./services/api";
import NotFound from "./pages/NotFound";
import { hasPermission, savePermissionsToLocalStorage } from "./utils/util";
import { TodosEventosPage } from "./pages/TodosEventosPage";
import { SejaMembroPage } from "./pages/SejaMembroPage";
import { ListProductPage } from "./pages/ListProductPage";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EventoCompraPage } from "./pages/EventoCompraPage";
import { CreateEventoCompraPage } from "./pages/CreateEventoCompraPage";
import { CompraColetivaPage } from "./pages/CompraColetivaPage";
import { CreateInterestPage } from "./pages/CreateInterestPage";
import { UserInterestedPage } from "./pages/UserInterestedPage";
import Loading from "./componets/Loading";
import { CreateNewPassWordPage } from "./pages/CreateNewPassword";
import { UpdateEventoCompraPage } from "./pages/UpdateEventoCompraPage";

export const App = () => {
  const [permissoes, setPermissoes] = useState(['']);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      setCarregando(true);
      try {
        const data = await fetchMe();
        setPermissoes(data.profile.permissions);
        savePermissionsToLocalStorage(data.profile.permissions);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar permissões. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    console.log(permissoes);
    console.log("permissão:", hasPermission('edit.userdd'));
  }, [permissoes]);

  if (carregando) {
    return <Loading />
  }

  // if (erro) {
  //   return <div>{erro}</div>;
  // }



  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/main" element={<Out />}>
            {permissoes.includes('read.users') &&
              <Route path="users" element={<UserList />} />}
            {permissoes.includes('read.profiles') &&
              <Route path="perfis" element={<PerfilsList />} />}
            {permissoes.includes('dashboard') &&
              <Route path="dashboard" element={<DashboardMain />} />}
            {permissoes.includes('read.membros') &&
              <Route path="novos-membros" element={<NovosMembrosList />} />}
            {permissoes.includes('read.apoiadores') &&
              <Route path="apoiadores" element={<NovosParceirosList />} />}
            {permissoes.includes('manage.eventos') &&
              <>
                <Route path="agenda-eventos" element={<AgendaEventosList />} />
                <Route path="create-evento" element={<CreateNovoEvento />} />
              </>}
            {permissoes.includes('eventos.inscricao') &&
              <>
                <Route path="todos-eventos" element={<TodosEventosPage />} />
                <Route path="meus-eventos" element={<MeusEventosList />} />
              </>}
            {permissoes.includes('create.user') &&
              <>
                <Route path="create-user" element={<CreateUserPage />} />
                <Route path="update-user/:id" element={<UpdateUserPage />} />
              </>}
            {permissoes.includes('manage.compras') &&
              <>
                <Route path="list-product" element={<ListProductPage />} />
                <Route path="create-product" element={<CreateProductPage />} />
                <Route path="list-evento-compras" element={<EventoCompraPage />} />
                
                <Route path="update-event-compras/:id" element={<UpdateEventoCompraPage />} />
                <Route path="create-event-compras" element={<CreateEventoCompraPage />} />
                <Route path="list-interested/:id" element={<UserInterestedPage />} />

              </>
            }

            <Route path="create-interest/:id" element={<CreateInterestPage />} />
            <Route path="list-compra-coletiva" element={<CompraColetivaPage />} />
            {permissoes.includes('create.profile') &&
              <>
                <Route path="create-perfil" element={<CreatePerfilPage />} />
                <Route path="update-perfil/:id" element={<UpdatePerfilPage />} />
              </>}
            {permissoes.includes('create.membro') &&
              <>
                <Route path="update-membro/:id" element={<UpdateMembroPage />} />
                <Route path="create-membro" element={<CreateNovosMembrosPage />} />
              </>}
            {permissoes.includes('create.apoiador') &&
              <>
                <Route path="update-apoiador/:id" element={<UpdateApoiadorPage />} />
                <Route path="create-apoiador" element={<CreateNovosApoadoresPage />} />
              </>}
          </Route>
          <Route path="/" element={<NewLogin />} />
          <Route path="/create-password/:id" element={<CreateNewPassWordPage />} />
          <Route path="/seja-membro" element={<SejaMembroPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};