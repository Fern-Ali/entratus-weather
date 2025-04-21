'use client';

import { useEffect, useState } from 'react';
import { parks } from '../../data/parks';
import ParkCard from '../components/ParkCard';
import MultiParkLineChart from '../components/MultiParkLineChart';
import AverageTempBarChart from '../components/AverageTempBarChart';
import Description from '../components/Description';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type Forecast = {
  date: string;
  temp: number;
  description: string;
};

type ParkForecast = {
  name: string;
  forecast: Forecast[];
  image: string;
};

export default function HomePage() {
  const [data, setData] = useState<ParkForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecasts = async () => {
      const promises = parks.map(async (park) => {
        try {
          const res = await fetch(`http://localhost:8000/forecast?lat=${park.lat}&lon=${park.lon}`);
          if (!res.ok) throw new Error('Fetch failed');
          const resJson = await res.json();
          return { name: park.name, forecast: resJson.forecast, image: park.img };
        } catch (e) {
          console.error(`Error fetching forecast for ${park.name}:`, e);
          return { name: park.name, forecast: [], image: park.img };
        }
      });

      const results = await Promise.all(promises);
      setData(results);
      setLoading(false);
    };

    fetchForecasts();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Typography variant='h4'>WaaS (Weather as a Service)</Typography>
      </Grid>
      <Grid item xs={4} >        
        <Description />
      </Grid>
      <Grid item xs={8}>
        {/* <AverageTempBarChart parksData={data} /> */}
        <MultiParkLineChart parksData={data} />
      </Grid>
      


      {data.map((park, i) => (
        <Grid item xs={12} sm={6} md={4} key={park.name}>
          <ParkCard
            name={park.name}
            location={`${parks[i].lat}, ${parks[i].lon}`}
            image={park.image}
            active={park.forecast.length > 0}
            forecast={park.forecast}
            index={i}
          />
        </Grid>
      ))}
    </Grid>
  );
}
