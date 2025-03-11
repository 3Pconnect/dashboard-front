import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Importando o tipo ApexOptions para tipagem

interface TotalInadimplentesChartProps {
  totalInadimplentes: number;
}

const TotalInadimplentes: React.FC<TotalInadimplentesChartProps> = ({ totalInadimplentes }) => {
  // Tipando explicitamente as opções com ApexOptions
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions; // Usando ApexOptions para tipar corretamente
  }>({
    series: [totalInadimplentes, 100 - totalInadimplentes], // Total de inadimplentes e o restante para completar 100%
    options: {
      chart: { type: "donut", height: 350 },
      title: { text: "Total de Inadimplentes", align: "left" },
      labels: ["Inadimplentes", "Adimplentes"], // Labels para as duas partes
      plotOptions: {
        pie: {
          donut: {
            size: '60%', // Controla o tamanho do buraco no meio
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          colors: ["#fff"],
        },
        formatter: (val: number) => `${val.toFixed(1)}%`, // Mostra a porcentagem com 1 casa decimal
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val.toFixed(1)}%`, // Mostra a porcentagem na tooltip
        },
      },
      colors: ["#D32F2F", "#2E7D32"], // Definindo as cores dos inadimplentes e adimplentes
    },
  });

  useEffect(() => {
    // Atualiza os dados se o total de inadimplentes mudar
    setState({
      ...state,
      series: [totalInadimplentes, 100 - totalInadimplentes],
    });
  }, [totalInadimplentes]);

  return (
    <div>
      <ReactApexChart
        options={{
          ...state.options,
          theme: {
            mode: 'dark',  // Definindo o modo para "dark"
          },
        }}
        series={state.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default TotalInadimplentes;
