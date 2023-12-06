import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { LoadingPanel, MatchBox, MatchBoxLayered, NoGamesLabel } from 'components';

import { retrieveLeague, retrieveDisplayFormat } from '../store/gamesSlice';
import { MATCH_DISPLAY } from 'consts';

const LeaguePanel = ({ league }) => {
  const { initialLoading, games } = useSelector((state) => retrieveLeague(state, league));
  const displayFormat = useSelector((state) => retrieveDisplayFormat(state));

  if (initialLoading) {
    return <LoadingPanel />;
  }

  if (games.length === 0) {
    return <NoGamesLabel />;
  }

  function displayMatch(game) {
    switch (displayFormat) {
      case MATCH_DISPLAY.LINEAR:
        return <MatchBox {...game} />
      case MATCH_DISPLAY.MULTI:
        return <MatchBoxLayered {...game} />
      default:
        return <MatchBoxLayered {...game} />
    };
  }

  return (
    <Grid container spacing={{ md: 1, lg: 2 }}>
      {games?.map((game, i) =>
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6} 
          lg={4} 
          key={`${league}_${i}`}
        >
          {displayMatch(game)}
        </Grid>
      )}
    </Grid>
  );
}
 
export default LeaguePanel;