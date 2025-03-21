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
        fontFamily: "Bai Jamjuree, sans-serif",
      },
      title: {
        text: "Total de Membros por Mês",
        align: "left",
        style: {
          color: "#FFFFFF",
          fontSize: "18px",
          fontFamily: "Bai Jamjuree, sans-serif",
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#FFFFFF",
            fontSize: "14px",
            fontFamily: "Bai Jamjuree, sans-serif",
          },
        },
      },
      yaxis: {
        title: {
          text: "Membros",
          style: {
            color: "#FFFFFF",
            fontSize: "16px",
            fontFamily: "Bai Jamjuree, sans-serif",
          },
        },
        labels: {
          style: {
            colors: "#FFFFFF",
            fontSize: "14px",
            fontFamily: "Bai Jamjuree, sans-serif",
          },
        },
      },
      theme: {
        mode: "dark",
      },
      dataLabels: {
        style: {
          colors: ["#FFFFFF"],
          fontSize: "14px",
          fontFamily: "Bai Jamjuree, sans-serif",
        },
      },
    },
  });

  // Atualiza o estado com os dados dos membros
  useEffect(() => {
    const data = totalMembrosPorMes.map((item) => ({
      x: new Date(item.mes).getTime(),
      y: parseInt(item.totalMembros),
    }));

    setState({
      series: [
        {
          name: "Total Membros",
          data,
        },
      ],
      options: state.options,
    });
  }, [totalMembrosPorMes]);

  return (
    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
      <VStack spacing={4} p={4} w="full" bg="#0B244D" justifyContent="center"
       borderRadius="10px">
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
