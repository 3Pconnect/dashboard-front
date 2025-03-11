import { VStack } from "@chakra-ui/react";
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
        type: "area", // Tipo do gráfico
        stacked: false,
        height: 350,
      },
      title: {
        text: "Total de Membros por Mês",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Membros",
        },
      },
    },
  });

  // Atualiza o estado com os dados dos membros
  useEffect(() => {
    const data = totalMembrosPorMes.map((item) => ({
      x: new Date(item.mes).getTime(), // Convertendo o mês para timestamp
      y: parseInt(item.totalMembros),  // Convertendo o total de membros para número
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
    <div>
      <VStack>
        
      </VStack>
      <div id="chart">
      <ReactApexChart
      style={{borderRadius: "10px"}}
  options={{
    ...state.options,
    theme: {
      mode: 'dark',  // Definindo o modo para "dark"
    },
  }}
  series={state.series}
  type="area"
  height={350}
/>

      </div>
    </div>
  );
};

export default TotalAssociadosChart;
