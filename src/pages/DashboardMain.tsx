import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import TaxaRenovacaoAssociadoChart from "../componets/TaxaRenovacaoAssociadoChart";

const DashboardMain: React.FC = () => {
  const data = {
    series: [
      {
        name: "XYZ MOTORS",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => (val / 1000000).toFixed(0),
        },
        title: {
          text: "Price",
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
  };
  
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} p={4}>
      <TaxaRenovacaoAssociadoChart dates={[]}/>
      <TaxaRenovacaoAssociadoChart dates={[]}/>
    </SimpleGrid>
  );
};

export default DashboardMain;