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
        background: "transparent",
        fontFamily: "Bai Jamjuree, sans-serif",
      },
      title: {
        text: "Total de Membros por Estado",
        align: "left",
        style: {
          color: "#FFFFFF", // Cor do título
          fontSize: "18px",
          fontFamily: "Bai Jamjuree, sans-serif",
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#FFFFFF", // Cor dos rótulos do eixo X
            fontSize: "14px",
            fontFamily: "Bai Jamjuree, sans-serif",
          },
        },
      },
      yaxis: {
        title: {
          text: "Total de Membros",
          style: {
            color: "#FFFFFF", // Cor do título do eixo Y
            fontSize: "16px",
            fontFamily: "Bai Jamjuree, sans-serif",
          },
        },
        labels: {
          style: {
            colors: "#FFFFFF", // Cor dos números do eixo Y
            fontSize: "14px",
            fontFamily: "Bai Jamjuree, sans-serif",
          },
        },
      },
      colors: ["#4cb8b0"], // Cor das barras
      theme: {
        mode: "dark",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        style: {
          colors: ["#FFFFFF"], // Cor dos valores dentro das barras
          fontSize: "14px",
          fontFamily: "Bai Jamjuree, sans-serif",
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
      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Total Membros",
            data: valores,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: estados,
          },
        },
      }));
    }
  }, [dados]);

  return (
    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} p={4}>
      <VStack spacing={4} p={4} w="full" h="600px" bg="#0B244D" justifyContent="center" borderRadius="10px">
        <ReactApexChart  style={{ width: "100%"}}  options={state.options} series={state.series} type="bar" height={550} />
      </VStack>
    </SimpleGrid>
  );
};

export default TotalAssociadosChartPorEstado;
