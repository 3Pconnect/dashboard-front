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
      },
      title: {
        text: "Treinamentos Realizados por Mês",
        align: "left",
      },
      xaxis: {
        type: "category", // Usando categorias para os meses
      },
      yaxis: {
        title: {
          text: "Treinamentos",
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
    <div>
      <div id="chart">
        <ReactApexChart
          style={{ borderRadius: "10px" }}
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default TotalTreinamentoRealizadosChart;
