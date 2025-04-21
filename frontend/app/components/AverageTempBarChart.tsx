'use client';

import { BarChart } from '@mui/x-charts/BarChart';

type Forecast = { date: string; temp: number };
type ParkForecast = { name: string; forecast: Forecast[] };

type Props = {
  parksData: ParkForecast[];
};

export default function MultiParkBarChart({ parksData }: Props) {
  // Transform forecast data into a dataset usable by MUI's BarChart
  const dataset = parksData[0]?.forecast.map((_, i) => {
    const row: Record<string, string | number> = {
      date: parksData[0].forecast[i].date,
    };
    parksData.forEach((park) => {
      row[park.name] = park.forecast[i]?.temp ?? 0;
    });
    return row;
  });

  const series = parksData.map((park) => ({
    dataKey: park.name,
    label: park.name,
  }));

  return (
    <BarChart
      height={200}
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
      series={series}
      yAxis={[{ label: 'Temp (°F)', width: 60 }]}
      legend={{ direction: 'row', position: { vertical: 'top', horizontal: 'middle' } }}
    />
  );
}
