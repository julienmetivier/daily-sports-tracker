import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { ALL_LEAGUES } from 'consts';

import { retrieveLeagues, setLeaguesOrder } from '../../store/gamesSlice';

const ToggleLeagues = () => {
  const dispatch = useDispatch();
  const leagues = useSelector(retrieveLeagues);

  const handleLeaguesChange = (selectedLeagues) => {
    dispatch(setLeaguesOrder({leagues: selectedLeagues}));
  }

  return ( 
    <ToggleButtonGroup
      value={leagues}
      size='small'
      onChange={(event, selectedLeagues) => handleLeaguesChange(selectedLeagues)}
      aria-label='leagues display'
    >
      { ALL_LEAGUES.map(league => {
        return (
          <ToggleButton value={league} aria-label={`toggle ${league} display`} key={`toggle_${league}`}>
            {league}
          </ToggleButton>
        )}
      )}
    </ToggleButtonGroup>
  );
}
 
export default ToggleLeagues;