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
        fontFamily: "Bai Jamjuree, sans-serif", // Fonte personalizada
      },
      title: {
        text: "Treinamentos Realizados por Mês",
        align: "left",
        style: {
          color: "#FFFFFF", // Cor do título
          fontSize: "18px",
          fontFamily: "Bai Jamjuree, sans-serif", // Fonte personalizada
        },
      },
      xaxis: {
        type: "category", // Usando categorias para os meses
        labels: {
          style: {
            colors: "#FFFFFF", // Cor das labels do eixo X
          },
        },
      },
      yaxis: {
        title: {
          text: "Treinamentos",
          style: {
            color: "#FFFFFF", // Cor do título do eixo Y
          },
        },
        labels: {
          style: {
            colors: "#FFFFFF", // Cor das labels do eixo Y
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%", // Ajustando o tamanho das barras
        },
      },
      theme: {
        mode: "dark", // Mantendo o modo "dark" para o gráfico
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
      <VStack spacing={4} p={4} w="full" bg="#0B244D" justifyContent="center" borderRadius="10px">
         <ReactApexChart
          options={{
            ...state.options,
            theme: {
              mode: "dark", // Modo escuro
            },
          }}
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
