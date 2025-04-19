import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Importando o tipo ApexOptions para tipagem
import { SimpleGrid, VStack } from "@chakra-ui/react";

interface TaxaRenovacaoChartProps {
  taxaRenovacao: number;
}

const TaxaRenovacaoAssociadoChart: React.FC<TaxaRenovacaoChartProps> = ({ taxaRenovacao }) => {
  // Tipando explicitamente as opções com ApexOptions
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions; // Usando ApexOptions para tipar corretamente
  }>({
    series: [taxaRenovacao, 100 - taxaRenovacao], // Taxa de renovação e o restante para completar 100%
    options: {
      chart: {
        background: "transparent",
        type: "donut", // Tipo do gráfico
        height: 350,
        fontFamily: "Montserrat, sans-serif", // Fonte Montserrat
        
      },
      title: {
        text: "Taxa de Renovação",
        align: "left",
        style: {
          color: "#2D3748", // Cor escura para o tema claro
          fontSize: "18px",
          fontFamily: "Montserrat, sans-serif", // Fonte Montserrat
          fontWeight: 400,
        },
      },
      labels: ["Renovação", "Não Renovação"], // Labels para as duas partes
      plotOptions: {
        pie: {
          donut: {
            size: "60%", // Controla o tamanho do buraco no meio
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontWeight: 400,
          fontSize: "14px",
          colors: ["#2D3748"], // Cor escura para o tema claro
          fontFamily: "Montserrat, sans-serif", // Fonte Montserrat
        },
        formatter: (val: number) => `${val.toFixed(1)}%`, // Mostra a porcentagem com 1 casa decimal
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val.toFixed(1)}%`, // Mostra a porcentagem na tooltip
        },
      },
      colors: ["#48BB78", "#E53E3E"], // Cores para o tema claro (verde e vermelho)
    },
  });

  useEffect(() => {
    // Atualiza os dados se a taxa de renovação mudar
    setState({
      ...state,
      series: [taxaRenovacao, 100 - taxaRenovacao],
    });
  }, [taxaRenovacao]);

  return (
    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
      <VStack spacing={4} p={4} w="full" bg="white"         border="1px solid #E2E8F0"
        boxShadow="sm" justifyContent="center" borderRadius="10px">
        <ReactApexChart
          style={{ borderRadius: "10px", width: "100%" }}
          options={{
            ...state.options,
            theme: {
              mode: "light", // Modo claro
            },
          }}
          series={state.series}
          type="donut"
          height={350}
        />
      </VStack>
    </SimpleGrid>
  );
};

export default TaxaRenovacaoAssociadoChart;
