import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useMediaQuery, Box } from "@chakra-ui/react";

export const Grafico = ({ data, days }) => {
  const [isLargerThan1281] = useMediaQuery("(min-width: 1281px)");

  const arrayLabelsGenerate = (days = 7) => {
    const array = [];
    for (let i = 0; i < days; i++) {
      array.push(i);
    }
    return array.join("").split("");
  };

  const price = data.map((item) => Number(item.low));
  const reversePrice = price.reverse();
  const arrayLabels = arrayLabelsGenerate(days);

  return (
    <>
      {isLargerThan1281 ? (
        <>
          <Box>
            <Line
              data={{
                labels: arrayLabels /* days */,
                datasets: [
                  {
                    label: "Gráfico em Linha",
                    data: reversePrice /* preços */,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              height={500}
              width={700}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 35,
                  },
                },
              }}
            />
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Line
              data={{
                labels: arrayLabels /* days */,
                datasets: [
                  {
                    label: "Gráfico em Linha",
                    data: reversePrice /* preços */,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              height={150}
              width={350}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 35,
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </>
  );
};
