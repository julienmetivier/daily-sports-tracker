import { Box, Typography } from '@mui/material';

import { MLBPanel, NBAPanel, NCAAFPanel, NFLPanel, NHLPanel } from 'containers';

import './App.css';
import ESPNLogo from './assets/ESPN_wordmark.svg';

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
          <Typography variant='h3'>Daily Sports Tracker</Typography>
          <Typography variant='h5'>{localTime}</Typography>
          <Box sx={{display: 'inline-flex', justifyContent: 'center'}}>
            <Typography variant='h6' sx={{mr: '0.5rem'}}>Data brought you by</Typography>
            <a href='https://espn.go.com/' target='_blank' rel='noreferrer'>
              <Box
                component="img"
                sx={{
                  width: 97,
                  height: 24
                }}
                alt='ESPN Logo'
                src={ESPNLogo}
              />
            </a>
          </Box>
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
// DONE - Rewrite README
// DONE - Make hooks team creation generic
// Make all files TSX
// DONE - Add ESPN logo in title
// Add rank to NCAAF
