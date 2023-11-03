import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';

import { LoadingPanel, MatchBox, NoGamesLabel } from 'components';
import { DATA_URLS } from 'consts';

import useFetchGames from 'hooks/useFetchGames';

import { setGames } from '../store/gamesSlice';

const LeaguePanel = ({ league }) => {
  const dispatch = useDispatch();
  const { data, loading } = useFetchGames(league, DATA_URLS[league]);

  useEffect(() => {
    if (data.length !== 0) {
      dispatch(setGames({ league, games: data }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [league, data]); // Dispatch is recommended to be avoided


  if (loading) {
    return <LoadingPanel />;
  }

  if (data.length === 0) {
    return <NoGamesLabel />;
  }

  return (
    <Grid container spacing={2}>
      {data?.map((game, i) =>
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