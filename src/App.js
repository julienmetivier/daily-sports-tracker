import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { LeaguePanel } from 'containers';
import { PanelWrapper } from 'components';
import { DATA_URLS } from 'consts';

import { retrieveLeagues, setGames } from './store/gamesSlice';
import './App.css';
import ESPNLogo from './assets/ESPN_wordmark.svg';
import { formatFetchCall } from 'utils';

function App() {
  const dispatch = useDispatch();
  const leagues = useSelector(retrieveLeagues);

  useEffect(() => {
    const fetchLeagueData = async (league) => {
      try {
        const response = await fetch(DATA_URLS[league]);
        if (response.ok) {
          const result = await response.json();
          const data = formatFetchCall(league, result);
          dispatch(setGames({ league, games: data }));
        } else {
          // Handle error
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchLeaguesLoop = async () => {
      leagues.forEach(async (league) => {
        await fetchLeagueData(league);
      });
    };

    fetchLeaguesLoop();

    const intervalId = setInterval(() => {
      // Recall fetchLoop every 30 seconds
      fetchLeaguesLoop();
    }, 30000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagues]); // Not recommended to include dispatch

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
            <Typography variant='h6' sx={{mr: '0.5rem'}}>Data brought to you by</Typography>
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
        { leagues.map(league => {
            return (
              <PanelWrapper leagueName={league} key={league}>
                <LeaguePanel league={league} />
              </PanelWrapper>
            )}
          )
        }
      </body>
    </div>
  );
}

export default App;

// Create shareable props or interface
// Write tests, specially for MatchBox
// Add generic filtering for games order
// Movable sections (use cookies to keep order of leagues)
// Make all files TSX
// Add switch for Live updates
