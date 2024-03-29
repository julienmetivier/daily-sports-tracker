import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { ControlHeader, CookiesConsentFooter, DateSelectionPanel, LeaguePanel } from 'containers';
import { Footer, PanelWrapper } from 'components';
import { COLORS } from 'consts';
import { buildUrl, formatFetchCall } from 'utils';

import { retrieveLeagues, setGames } from './store/gamesSlice';
import useLoadLeaguesFromCookie from './hooks/useLoadLeaguesFromCookie';
import ESPNLogo from './assets/ESPN_wordmark.svg';
import './App.css';

const AppStyle = {
  textAlign: 'center',
  backgroundColor: COLORS.SECONDARY,
  width: '100vw',
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
  useLoadLeaguesFromCookie();

  const [ isContinuousUpdate, setIsContinuousUpdate ] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchLeagueData = async (league) => {
      try {
        const url = buildUrl(league, currentDate);
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          const data = formatFetchCall(league, result, currentDate);
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
  }, [currentDate, leagues, isContinuousUpdate]); // Not recommended to include dispatch

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
        <DateSelectionPanel currentDate={currentDate} setCurrentDate={setCurrentDate} />
        { leagues.map(league => {
            return (
              <PanelWrapper leagueName={league} key={league}>
                <LeaguePanel league={league} />
              </PanelWrapper>
            )}
          )
        }
      </body>
      <Footer />
      <CookiesConsentFooter />
    </Box>
  );
}

export default App;
