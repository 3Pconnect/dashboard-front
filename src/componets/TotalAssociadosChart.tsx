import { SimpleGrid, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// Definindo os tipos dos dados
interface MembroMes {
  mes: string;
  totalMembros: string;
}

interface TotalAssociadosChartProps {
  totalMembrosPorMes: MembroMes[];
}

interface ChartState {
  series: Array<{ name: string; data: { x: number; y: number }[] }>;
  options: ApexCharts.ApexOptions;
}

const TotalAssociadosChart: React.FC<TotalAssociadosChartProps> = ({
  totalMembrosPorMes,
}) => {
  const [state, setState] = useState<ChartState>({
    series: [
      {
        name: "Total Membros",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        background: "transparent",
        fontFamily: "Montserrat, sans-serif", // Alterado para Montserrat
      },
      title: {
        text: "Total de Membros por Mês",
        align: "left",
        style: {
          color: "#000000", // Preto para o tema claro
          fontSize: "16px",
          fontWeight: 400,
          fontFamily: "Montserrat, sans-serif", // Alterado para Montserrat
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#000000", // Preto
            fontSize: "14px",
            fontWeight: 400,
            fontFamily: "Montserrat, sans-serif", // Alterado para Montserrat
          },
        },
      },
      yaxis: {
        title: {
          text: "Membros",
          style: {
            color: "#000000", // Preto
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "Montserrat, sans-serif", // Alterado para Montserrat
          },
        },
        labels: {
          style: {
            colors: "#000000", // Preto
            fontSize: "14px",
            fontFamily: "Montserrat, sans-serif", // Alterado para Montserrat
          },
        },
      },
      theme: {
        mode: "light", // Modo claro
      },
      dataLabels: {
        style: {
          colors: ["#000000"], // Preto
          fontSize: "14px",
          fontFamily: "Montserrat, sans-serif", // Alterado para Montserrat
        },
      },
    },
  });

  useEffect(() => {
    const data = totalMembrosPorMes.map((item) => ({
      x: new Date(item.mes).getTime(),
      y: parseInt(item.totalMembros),
    }));

    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Total Membros",
          data,
        },
      ],
    }));
  }, [totalMembrosPorMes]);

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
          type="area"
          height={350}
        />
      </VStack>
    </SimpleGrid>
  );
};

export default TotalAssociadosChart;
