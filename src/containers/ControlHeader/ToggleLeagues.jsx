import { useDispatch, useSelector } from 'react-redux';
import { Chip, ThemeProvider, createTheme } from '@mui/material';

import { ALL_LEAGUES } from 'consts';

import { retrieveLeagues, setLeaguesOrder } from '../../store/gamesSlice';

// To modify the theme of the Chip component
const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
    },
  },
});

const ToggleLeagues = () => {
  const dispatch = useDispatch();
  const leagues = useSelector(retrieveLeagues);

  const handleLeaguesChange = (selectedLeague) => {
    const newLeagues = leagues.includes(selectedLeague)
      ? leagues.filter(league => league !== selectedLeague)
      : [...leagues, selectedLeague];

    dispatch(setLeaguesOrder({leagues: newLeagues}));
  }

  const sortedLeagues = [...ALL_LEAGUES].sort((a, b) => {
    if (leagues.includes(a) && leagues.includes(b)) {
      return leagues.indexOf(a) - leagues.indexOf(b);
    }
    if (leagues.includes(a)) return -1;
    if (leagues.includes(b)) return 1;
    return 0;
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        { sortedLeagues.map(league => {
          return (
            <Chip
              label={league} 
              key={`chip_${league}`}
              clickable
              color={leagues.includes(league) ? 'primary' : 'default'}
              onClick={() => handleLeaguesChange(league)}
            />
          )}
        )}
      </div>
    </ThemeProvider>
  );
}
 
export default ToggleLeagues;