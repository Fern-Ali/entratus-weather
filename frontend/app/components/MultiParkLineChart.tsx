'use client';

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

type Forecast = {
  date: string;
  temp: number;
};

type ParkForecast = {
  name: string;
  forecast: Forecast[];
};

type Props = {
  parksData: ParkForecast[];
};

export default function MultiParkLineChart({ parksData }: Props) {
  // Assume all parks have 7 dates — use the first park's dates as x-axis
  const xLabels = parksData[0]?.forecast.map((day) => day.date) || [];

  const series = parksData.map((park) => ({
    label: park.name,
    data: park.forecast.map((day) => day.temp),
  }));

  return (
    <LineChart
      height={400}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{ label: '°F', width: 50 }]}
      series={series}
      margin={{ }}
      legend={{ direction: 'row', position: { vertical: 'top', horizontal: 'middle' } }}
    />
  );
}
