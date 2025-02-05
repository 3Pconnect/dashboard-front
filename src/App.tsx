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

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/main" element={<LayoutApp />}> {/* LayoutApp como rota pai */}
          <Route path="users" element={<UserList/>} />
          <Route path="perfis" element={<PerfilsList/>} />
          <Route path="dashboard" element={<DashboardMain/>} />
          <Route path="novos-membros" element={<NovosMembrosList/>} />
          <Route path="apoiadores" element={<NovosParceirosList/>} />
          <Route path="agenda-eventos" element={<AgendaEventosList/>} />
          <Route path="meus-eventos" element={<MeusEventosList/>} />
          {/* Outras rotas dentro do LayoutApp */}
        </Route>

        <Route path="/" element={<NewLogin />} />
        <Route path="/test" element={<LayoutPremium />} />
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
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedProvider>
                <Feed />
              </FeedProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </ChakraProvider>
)
