'use client';

import {
  Card,
  CardMedia,
  Stack,
  Typography,
  Chip,
  Rating,
  Switch,
  CardContent,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const PARK_CHART_COLORS = [
    '#1976d2', // Blue
    '#9c27b0', // Purple
    '#2e7d32', // Green
    '#ed6c02', // Orange
    '#d32f2f', // Red
    '#0288d1', // Cyan
    '#6d4c41', // Brown
    '#f9a825', // Yellow
  ];

//   color:PARK_CHART_COLORS[index] 

type Forecast = {
  date: string;
  temp: number;
  description: string;
};

type ParkCardProps = {
  name: string;
  location: string;
  image: string;
  active: boolean;
  forecast: Forecast[];
  index: number;
};

export default function ParkCard({
  name,
  location,
  image,
  active,
  forecast,
  index,
}: ParkCardProps) {
  const chartData = forecast.map((d, i) => ({
    x: i + 1,
    y: d.temp,
    label: d.date,
  }));

  return (
    <Card>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={3} useFlexGap>
          <Stack direction="column" spacing={0.5} useFlexGap>
            <Typography fontWeight={600}>{name}</Typography>
            <Typography variant="body2" color="text.secondary">{location}</Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              
              <Rating defaultValue={4} size="small" readOnly />
            </Stack>
          </Stack>
          
        </Stack>

        {chartData.length > 0 && (
          <LineChart
            dataset={chartData}
            xAxis={[{ dataKey: 'x', label: '7 Day Forecast', valueFormatter: (_, i) => chartData[i]?.label }]}
            series={[{ dataKey: 'y', label: 'Temp (°F)', area: false, }]}
            height={220}
            margin={{ }}
            grid={{ vertical: true, horizontal: true }}
          />
        )}
      </CardContent>
    </Card>
  );
}
