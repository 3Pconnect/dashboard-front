import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Definindo o tipo de dados para o gráfico
interface ChartState {
  series: Array<{ name: string; data: { x: string; y: number }[] }>;
  options: ApexCharts.ApexOptions;
}

const TotalTreinamentosRealizadosChart: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    series: [
      {
        name: "Total de Treinamentos",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "Total de Treinamentos Realizados",
        align: "left",
      },
      xaxis: {
        categories: [], // As categorias de cada barra (ex: meses)
      },
      yaxis: {
        title: {
          text: "Quantidade de Treinamentos",
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: (val: number) => val.toString(),
        },
      },
    },
  });

  // Gerando dados aleatórios no useEffect
  useEffect(() => {
    // Função para gerar dados aleatórios para o gráfico
    const generateFakeData = () => {
      const generatedData: { x: string; y: number }[] = [];
      const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // Gerar dados aleatórios para cada mês
      categories.forEach((category) => {
        generatedData.push({
          x: category,
          y: Math.floor(Math.random() * 100), // Valor aleatório entre 0 e 100
        });
      });

      return { categories, data: generatedData };
    };

    const fakeData = generateFakeData();
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Total de Treinamentos",
          data: fakeData.data,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          categories: fakeData.categories,
        },
      },
    }));
  }, []); // O array vazio faz com que o useEffect execute apenas uma vez após o componente ser montado

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default TotalTreinamentosRealizadosChart;
