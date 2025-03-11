import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import TotalAssociadosChart from "../componets/TotalAssociadosChart";
import TaxaRenovacaoAssociadoChart from "../componets/TaxaRenovacaoAssociadoChart";
import TotalTreinamentoRealizadosChart from "../componets/TotalTreinamentoRealizadosChart";
import TotalInadimplentes from "../componets/TotalInadimplentes";
import { Statistic } from "antd";

// Definindo a estrutura do tipo de dados que vem da API
interface MembrosDashboardData {
  taxaRenovacao: number;
  taxaInadimplencia: number;
  totalMembrosPorMes: Array<{ mes: string; totalMembros: string }>;
}

const DashboardMain: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<MembrosDashboardData | null>(null);

  // Fetching dados da API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.seminariomecanicospremium.com.br/membros/dashboard/taxa-renovacao",
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      );
      const data = await response.json();
      setDashboardData(data);  // Salva os dados no estado
    };

    fetchData();
  }, []);

  // Se ainda não tiver dados, não renderize o dashboard
  if (!dashboardData) {
    return <div>Carregando...</div>;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
  <TotalAssociadosChart totalMembrosPorMes={dashboardData.totalMembrosPorMes} />

      <TaxaRenovacaoAssociadoChart taxaRenovacao={dashboardData.taxaRenovacao} />
      <TotalInadimplentes totalInadimplentes={dashboardData.taxaInadimplencia} />
      <TotalTreinamentoRealizadosChart totalMembrosPorMes={dashboardData.totalMembrosPorMes} />
    </SimpleGrid>
  );
};

export default DashboardMain;
