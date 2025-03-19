import { SimpleGrid, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartState {
  series: Array<{ name: string; data: number[] }>;
  options: ApexCharts.ApexOptions;
}

const TotalAssociadosChartPorEstado: React.FC<{ dados: Array<Record<string, number>> }> = ({ dados }) => {
  const [state, setState] = useState<ChartState>({
    series: [
      {
        name: "Total Membros",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 600,
      },
      title: {
        text: "Total de Membros por Estado",
        align: "left",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: "Total de Membros",
        },
      },
      colors: ["#4cb8b0"],
      theme: {
        mode: "dark",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
    },
  });

  useEffect(() => {
    const estados: string[] = [];
    const valores: number[] = [];

    dados.forEach((item) => {
      const [estado, total] = Object.entries(item)[0];
      estados.push(estado || "Desconhecido");
      valores.push(total);
    });

    if (estados.length > 0) {
      setState({
        series: [
          {
            name: "Total Membros",
            data: valores,
          },
        ],
        options: {
          ...state.options,
          xaxis: {
            categories: estados,
          },
        },
      });
    }
  }, [dados]);

  return (
    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} p={4}>
    <VStack spacing={4} p={4} w="full" h="600px" bg="#424242" justifyContent="center" borderRadius="10px">
      <ReactApexChart style={{ width: "100%" }} options={state.options} series={state.series} type="bar" height={550} />
    </VStack>
    </SimpleGrid>
  );
};

export default TotalAssociadosChartPorEstado;
