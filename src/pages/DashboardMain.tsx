import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import TaxaRenovacaoAssociadoChart from "../componets/TaxaRenovacaoAssociadoChart";
import TotalAssociadosChart from "../componets/TotalAssociadosChart";
import TotalTreinamentoRealizadosChart from "../componets/TotalTreinamentoRealizadosChart";

const DashboardMain: React.FC = () => {

  
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} p={4}>
      <TotalAssociadosChart />
      <TaxaRenovacaoAssociadoChart/>
      <TotalTreinamentoRealizadosChart/>
    </SimpleGrid>
  );
};

export default DashboardMain;