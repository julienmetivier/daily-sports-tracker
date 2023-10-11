import { Box, Typography } from '@mui/material';

import { MLBPanel, NHLPanel } from 'containers';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{m: '1rem'}}>
          <Typography variant="h3"> What's on</Typography>
        </Box>
      </header>
      <body>
        <MLBPanel />
        <NHLPanel />
      </body>
    </div>
  );
}

export default App;
