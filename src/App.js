import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { ControlHeader, LeaguePanel } from 'containers';
import { PanelWrapper } from 'components';
import { DATA_URLS, COLORS } from 'consts';

import { retrieveLeagues, setGames } from './store/gamesSlice';
import './App.css';
import ESPNLogo from './assets/ESPN_wordmark.svg';
import { formatFetchCall } from 'utils';

const AppStyle = {
  textAlign: 'center',
  backgroundColor: COLORS.SECONDARY,
  width: '100vw',
  minHeight: '90vw'
};

const HeaderStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',
  p: '1rem'
};

function App() {
  const dispatch = useDispatch();
  const leagues = useSelector(retrieveLeagues);

  const [ isContinuousUpdate, setIsContinuousUpdate ] = useState(false);

  useEffect(() => {
    const fetchLeagueData = async (league) => {
      try {
        const response = await fetch(DATA_URLS[league]);
        if (response.ok) {
          const result = await response.json();
          const data = formatFetchCall(league, result);
          dispatch(setGames({ league, games: data }));
        } else {
          console.error(`Failed to fetch data for ${league}`);
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
      if ( isContinuousUpdate ) {
        fetchLeaguesLoop();
      }
    }, 30000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagues, isContinuousUpdate]); // Not recommended to include dispatch

  const handleSwitchChange = () => {
    setIsContinuousUpdate(!isContinuousUpdate);
  };

  const localTime = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <Box sx={AppStyle}>
      <Box sx={HeaderStyle} component="header">
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
      <body>
        <ControlHeader
          isContinuousUpdate={isContinuousUpdate}
          onContinuousUpdateChange={handleSwitchChange}
        />
        { leagues.map(league => {
            return (
              <PanelWrapper leagueName={league} key={league}>
                <LeaguePanel league={league} />
              </PanelWrapper>
            )}
          )
        }
      </body>
    </Box>
  );
}

export default App;

// Add generic filtering for games order
// Add footer (Github link)
// Add banner for cookies permissions
// Movable sections (use cookies to keep order of leagues)
// Fix retrigger when unchecking continuous updates
// Write tests, specially for MatchBox
// Add logic to trigger default live updates based on day and time of day
// Create shareable props or interface
// Make all files TSX
// Add logic to change day for games results
