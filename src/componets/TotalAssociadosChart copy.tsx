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
        fontFamily: "Montserrat, sans-serif",
      },
      title: {
        text: "Total de Membros por Estado",
        align: "left",
        style: {
          color: "#000", // Cor padrão preta
          fontSize: "16px",
          fontWeight: 400,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#000", // Preto
            fontSize: "14px",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "Total de Membros",
          style: {
            color: "#000", // Preto
            fontSize: "16px",
            fontWeight: 400,
          },
        },
        labels: {
          style: {
            colors: "#000", // Preto
            fontSize: "14px",
          },
        },
      },
      colors: ["#008FFB"], // Azul padrão da biblioteca
      theme: {
        mode: "light", // Modo claro por padrão
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        style: {
          colors: ["#000"], // Preto para o contraste
          fontSize: "14px",
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
    <SimpleGrid className="indicator-title" columns={{ base: 1, md: 1 }} spacing={4} p={4}>
      <VStack
        spacing={4}
        p={4}
        w="full"
        h="600px"
        bg="white"
        border="1px solid #E2E8F0"
        borderRadius="10px"
        justifyContent="center"
        boxShadow="sm"
      >
        <ReactApexChart style={{ width: "100%" }} options={state.options} series={state.series} type="bar" height={550} />
      </VStack>
    </SimpleGrid>
  );
};

export default TotalAssociadosChartPorEstado;
