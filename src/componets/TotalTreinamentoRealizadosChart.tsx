import { SimpleGrid, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// Definindo os tipos dos dados
interface MembroMes {
  mes: string;
  total: string;
}

interface TotalTreinamentoRealizadosChartProps {
  totalMembrosPorMes: MembroMes[];
}

interface ChartState {
  series: Array<{ name: string; data: { x: string; y: number }[] }>;
  options: ApexCharts.ApexOptions;
}

const TotalTreinamentoRealizadosChart: React.FC<TotalTreinamentoRealizadosChartProps> = ({
  totalMembrosPorMes,
}) => {
  const [state, setState] = useState<ChartState>({
    series: [
      {
        name: "Treinamentos Realizados",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar", // Usando gráfico de barras para representar treinamentos
        height: 350,
        background: "transparent",
        fontFamily: "Montserrat, sans-serif", // Mantendo a fonte padrão Montserrat
      },
      title: {
        text: "Treinamentos Realizados por Mês",
        align: "left",
        style: {
          color: "#000000", // Cor do título para modo claro
          fontSize: "16px", // Tamanho ajustado
          fontFamily: "Montserrat, sans-serif", // Usando Montserrat
          fontWeight: 400, // Definindo o peso da fonte como 400
        },
      },
      xaxis: {
        type: "category", // Usando categorias para os meses
        labels: {
          style: {
            colors: "#000000", // Cor das labels do eixo X para o modo claro
            fontSize: "14px", // Ajuste no tamanho da fonte
            fontFamily: "Montserrat, sans-serif", // Fonte Montserrat
            fontWeight: 400, // Peso da fonte 400
          },
        },
      },
      yaxis: {
        title: {
          text: "Treinamentos",
          style: {
            color: "#000000", // Cor do título do eixo Y para o modo claro
            fontSize: "16px", // Tamanho ajustado
            fontFamily: "Montserrat, sans-serif", // Fonte Montserrat
            fontWeight: 400, // Peso da fonte 400
          },
        },
        labels: {
          style: {
            colors: "#000000", // Cor das labels do eixo Y para o modo claro
            fontSize: "14px", // Ajuste no tamanho da fonte
            fontFamily: "Montserrat, sans-serif", // Fonte Montserrat
            fontWeight: 400, // Peso da fonte 400
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%", // Ajustando o tamanho das barras
        },
      },
      theme: {
        mode: "light", // Mantendo o modo claro
      },
    },
  });

  // Atualiza o estado com os dados dos treinamentos
  useEffect(() => {
    const data = totalMembrosPorMes.map((item) => ({
      x: item.mes, // Usando o mês como categoria
      y: parseInt(item.total), // Convertendo o total de membros para número (representando os treinamentos)
    }));

    // Atualiza o estado com os dados e as opções sem modificar as opções
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Treinamentos Realizados",
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
        bg="white" // Cor de fundo ajustada para o modo claro
        justifyContent="center"
        borderRadius="10px"
        border="1px solid #E2E8F0"
        boxShadow="sm" // Adicionando sombra suave para consistência
      >
        <ReactApexChart
          options={state.options}
          style={{ borderRadius: "10px", width: "100%" }}
          series={state.series}
          type="bar"
          height={350}
        />
      </VStack>
    </SimpleGrid>
  );
};

export default TotalTreinamentoRealizadosChart;
