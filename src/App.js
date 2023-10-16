import { Box, Typography } from '@mui/material';

import { MLBPanel, NBAPanel, NCAAFPanel, NFLPanel, NHLPanel } from 'containers';

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
        {/* Refresh every 5 minutes */}
        <MLBPanel />
        <NHLPanel />
        <NBAPanel />
        <NFLPanel />
        <NCAAFPanel />
      </body>
    </div>
  );
}

export default App;

// Create shareable props or interface
// Write tests, specially for MatchBox
// Add generic filtering for games order
// Movable sections
// Rewrite README
