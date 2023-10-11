import { Box, Typography } from '@mui/material';

import { MLBPanel, NBAPanel, NHLPanel } from 'containers';

import './App.css';

function App() {
  const localTime = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{m: '1rem'}}>
          <Typography variant="h3">Daily Sports Tracker</Typography>
          <Typography variant='h5'>{localTime}</Typography>
        </Box>
      </header>
      <body>
        <MLBPanel />
        <NHLPanel />
        <NBAPanel />
      </body>
    </div>
  );
}

export default App;
