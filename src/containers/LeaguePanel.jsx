import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { LoadingPanel, MatchBox, NoGamesLabel } from 'components';

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
    <Grid container spacing={2}>
      {games?.map((game, i) =>
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={6} 
          lg={4} 
          key={`${league}_${i}`}
        >
          <MatchBox {...game}/>
        </Grid>
      )}
    </Grid>
  );
}
 
export default LeaguePanel;