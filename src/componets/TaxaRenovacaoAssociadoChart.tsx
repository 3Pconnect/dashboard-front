import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Importando o tipo ApexOptions para tipagem
import { SimpleGrid, VStack } from "@chakra-ui/react";

interface TaxaRenovacaoChartProps {
  taxaRenovacao: number;
}

const TaxaRenovacaoAssociadoChart: React.FC<TaxaRenovacaoChartProps> = ({ taxaRenovacao }) => {
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [taxaRenovacao, 100 - taxaRenovacao],
    options: {
      chart: {
        type: "donut", // Tipo do gráfico donut
        height: 350,
        background: "transparent",
        fontFamily: "Montserrat, sans-serif",
      },
      title: {
        text: "Taxa de Renovação",
        align: "center",
        style: {
          color: "#2D3748", // Cor escura para o título
          fontSize: "18px",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%", // Tamanho maior do buraco no centro
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontWeight: 400,
          fontSize: "16px", // Tamanho ajustado para maior legibilidade
          colors: ["#2D3748"],
          fontFamily: "Montserrat, sans-serif",
        },
        formatter: (val: number) => `${val.toFixed(1)}%`, // Exibe a porcentagem
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val.toFixed(1)}%`, // Tooltip com porcentagem
        },
      },
      colors: ["#48BB78", "#E53E3E"], // Verde para renovação e vermelho para não renovação
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
      <VStack
        spacing={4}
        p={4}
        w="full"
        bg="white"
        border="1px solid #E2E8F0"
        boxShadow="sm"
        justifyContent="center"
        borderRadius="10px"
      >
        <ReactApexChart
          style={{ borderRadius: "10px", width: "100%" }}
          options={state.options}
          series={state.series}
          type="donut"
          height={350}
        />
      </VStack>
    </SimpleGrid>
  );
};

export default TaxaRenovacaoAssociadoChart;
