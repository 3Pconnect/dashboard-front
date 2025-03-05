import {
  ChakraProvider,
  Text,
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
import LayoutApp from "./pages/Layout"; // Importe o LayoutApp
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
import { useState, useEffect } from "react"; // Importação correta dos hooks
import { fetchMe } from "./services/api";
import NotFound from "./pages/NotFound";
import { hasPermission, savePermissionsToLocalStorage } from "./utils/util";
import { TodosEventosPage } from "./pages/TodosEventosPage";

export const App = () => {
  const [permissoes, setPermissoes] = useState(['']);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchMe();
        setPermissoes(data.profile.permissions);
        savePermissionsToLocalStorage(data.profile.permissions)
      } catch (error) {
        console.error(error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    console.log(permissoes);

    console.log("permissão:", hasPermission('edit.userdd'));
  }, [permissoes]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/main" element={<Out />}> {/* LayoutApp como rota pai */}
            {permissoes.includes('read.users') &&
              <Route path="users" element={<UserList />} />}
            {permissoes.includes('read.profiles') &&
              <Route path="perfis" element={<PerfilsList />} />}
            <Route path="dashboard" element={<DashboardMain />} />
            {permissoes.includes('read.membros') &&
              <Route path="novos-membros" element={<NovosMembrosList />} />}
            {permissoes.includes('read.apoiadores') &&
              <Route path="apoiadores" element={<NovosParceirosList />} />}
            <Route path="agenda-eventos" element={<AgendaEventosList />} />
            <Route path="todos-eventos" element={<TodosEventosPage />} />
            <Route path="meus-eventos" element={<MeusEventosList />} />
            <Route path="create-user" element={<CreateUserPage />} />
            <Route path="create-perfil" element={<CreatePerfilPage />} />
            <Route path="update-perfil/:id" element={<UpdatePerfilPage />} />
            <Route path="update-membro/:id" element={<UpdateMembroPage />} />
            <Route path="update-apoiador/:id" element={<UpdateApoiadorPage />} />
            <Route path="create-membro" element={<CreateNovosMembrosPage />} />
            <Route path="create-apoiador" element={<CreateNovosApoadoresPage />} />
            <Route path="create-evento" element={<CreateNovoEvento />} />
            <Route path="update-user/:id" element={<UpdateUserPage />} />
          </Route>

          <Route path="/" element={<NewLogin />} />
          <Route path="/test" element={<Out />} />
          <Route path="/enfermeira" element={<Enfermeira />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PostProvider>
                  <MyProfile />
                </PostProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
