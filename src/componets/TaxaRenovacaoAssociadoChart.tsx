import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Definindo o tipo de dados do gráfico
interface ChartState {
  series: Array<{ name: string; data: { x: number; y: number }[] }>;
  options: ApexCharts.ApexOptions;
}

const TaxaRenovacaoAssociadoChart: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    series: [
      {
        name: "XYZ MOTORS",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar", // Alterei para "bar" para gráfico de barras
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Taxa de Renovação",
        align: "left",
      },
      fill: {
        type: "solid", // Preenchimento sólido para barras
      },
      yaxis: {
        labels: {
          formatter: (val: number) => (val / 1000000).toFixed(0),
        },
        title: {
          text: "Taxa de Renovação",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: (val: number) => (val / 1000000).toFixed(0),
        },
      },
    },
  });

  // Gerando dados fake no useEffect
  useEffect(() => {
    // Gerando dados aleatórios para o gráfico
    const generateFakeData = () => {
      const generatedData = [];
      const currentDate = new Date().getTime();

      // Gerar 30 pontos de dados aleatórios
      for (let i = 0; i < 30; i++) {
        generatedData.push({
          x: currentDate - (30 - i) * 86400000, // Data (1 dia de diferença para cada ponto)
          y: Math.floor(Math.random() * 1000000), // Valor aleatório entre 0 e 1.000.000
        });
      }

      return generatedData;
    };

    const fakeData = generateFakeData();
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "XYZ MOTORS",
          data: fakeData,
        },
      ],
    }));
  }, []); // O array vazio faz com que o useEffect execute apenas uma vez após o componente ser montado

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default TaxaRenovacaoAssociadoChart;
