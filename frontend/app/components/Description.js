import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import AddReactionIcon from '@mui/icons-material/AddReaction';

const items = [
    {
      icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: 'Backend built with FastAPI',
      description:
        'Weather data is retrieved from an external API using a Python-based FastAPI service, ensuring asynchronous performance and efficient processing.',
    },
    {
      icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: 'Custom data transformation',
      description:
        'Raw forecast data is reshaped using pandas and stored in a SQLite database.',
    },
    {
      icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: 'Real-time trend visualization',
      description:
        'Each forecast is parsed into formats designed for React-based visualizations, displaying weekly weather trends across national parks.',
    },
    {
      icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: 'Intelligent API design',
      description:
        'Endpoints support multiple locations and batch insights, allowing for dynamic requests for any location.',
    },
  ];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        This is where id put the title
      </Box> */}
      
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}