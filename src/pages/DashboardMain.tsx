import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import TotalAssociadosChart from "../componets/TotalAssociadosChart";
import TaxaRenovacaoAssociadoChart from "../componets/TaxaRenovacaoAssociadoChart";
import TotalTreinamentoRealizadosChart from "../componets/TotalTreinamentoRealizadosChart";
import TotalInadimplentes from "../componets/TotalInadimplentes";
import { Statistic } from "antd";
import { CardsIndicadoresNumericos } from "../componets/CardsIndicadoresNumericos";
import TotalAssociadosChartPorEstado from "../componets/TotalAssociadosChart copy";
import { fetchTaxaRenovacao, fetchTreinamentos, fetchUserCount } from "../services/api";

// Definindo a estrutura do tipo de dados que vem da API
interface MembrosDashboardData {
  taxaRenovacao: any;
  taxaInadimplencia: any;
  totalMembros: number;
  totalUserByState:any;
  totalTreinamentos:number;
  totalMembrosPorMes: Array<{ mes: string; totalMembros: string }>;
}
interface EventosDashboardData {
  totalTreinamentos:any;
  totalTreinamentosFuturo:any;
  taxaRenovacao: Array<{ mes: string; total: string }>;
}

const DashboardMain: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<MembrosDashboardData | null>(null);
  const [eventosData, setEventosData] = useState<EventosDashboardData | null>(null);
  const [totalUsers, setUsers] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTreinamentos();
        setEventosData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTaxaRenovacao();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.clear()
        const data = await fetchUserCount();
        
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  // Se ainda não tiver dados, não renderize o dashboard
  if (!dashboardData) {
    return <div>Carregando...</div>;
  }
  const dados = {
    "MG": 300,
    "SP": 12,
    "RJ": 50,
    "BA": 80
  };

  if (dashboardData) {
   console.log(totalUsers)
  }


  return (
    <>
    <CardsIndicadoresNumericos
    totalUser={totalUsers}
    inadimplentes={dashboardData.taxaInadimplencia.inadimplentes}
    renovacoes={dashboardData.taxaRenovacao.renovacoes}
    totalMembros={dashboardData.totalMembros}
    totalTreinamentos={eventosData?.totalTreinamentos.totalTreinamentos}
    totalTreinamentosFuturos={eventosData?.totalTreinamentosFuturo.totalTreinamentosFuturos}/>
    <TotalAssociadosChartPorEstado dados={dashboardData.totalUserByState}/>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
  <TotalAssociadosChart totalMembrosPorMes={dashboardData.totalMembrosPorMes} />

      <TaxaRenovacaoAssociadoChart taxaRenovacao={dashboardData.taxaRenovacao.taxa_renovacao} />
      <TotalInadimplentes totalInadimplentes={dashboardData.taxaInadimplencia.taxa_inadimplencia} />
      <TotalTreinamentoRealizadosChart totalMembrosPorMes={eventosData?.taxaRenovacao ?? []} />

    </SimpleGrid>
    </>
  );
};

export default DashboardMain;
