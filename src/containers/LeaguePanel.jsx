import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { LoadingPanel, MatchBoxLayered, NoGamesLabel } from 'components';

import { retrieveLeague } from '../store/gamesSlice';

const LeaguePanel = ({ league }) => {
  const { initialLoading, games } = useSelector((state) => retrieveLeague(state, league));

  if (initialLoading) {
    return <LoadingPanel />;
  }

  if (games.length === 0) {
    return <NoGamesLabel />;
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
          <MatchBoxLayered {...game}/>
        </Grid>
      )}
    </Grid>
  );
}
 
export default LeaguePanel;