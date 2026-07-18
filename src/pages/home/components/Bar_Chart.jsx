import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetData from "../../../hooks/useGetData";
import { API } from "../../../service/apiUrl";

const Bar_Chart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { data } = useGetData(API.admin.home.revenue);

  useEffect(() => {
    const secondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-secondary-light")
      .trim();

    const ChartData = {
      labels: data?.months?.map((item) => t(item)),
      datasets: [
        {
          label: "Sales",
          data: data?.revenues,
          backgroundColor: data?.revenues?.map((value) =>
            value >= 0 ? secondaryColor : "#E2DDD7"
          ),
          borderColor: "transparent",
          barThickness: 11,
          borderRadius: 999,
          borderSkipped: false,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          grid: {
            color: "#22303E1F",
            borderDash: [6, 20],
            lineWidth: 0.5,
          },
          ticks: {
            padding: 10,
            color: "#22303E66",
          },
          border: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#22303E66",
            autoSkip: false,
            maxRotation: 90,

            minRotation: 45,
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    setChartData(ChartData);
    setChartOptions(options);
  }, [data, t]);

  return (
    <div className="">
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        style={{ height: "228px", width: "100%" }}
      />
    </div>
  );
};

export default Bar_Chart;
