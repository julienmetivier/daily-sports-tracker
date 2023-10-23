import { Grid } from '@mui/material';

import { LoadingPanel, MatchBox, NoGamesLabel } from 'components';

import useFetchFootballGames from 'hooks/useFetchFootballGames';

const NFLPanel = () => {
  const { data, loading } = useFetchFootballGames('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');

  if (loading) {
    return <LoadingPanel />;
  }

  if (data.length === 0) {
    return <NoGamesLabel />;
  }

  return (
    <Grid container spacing={2}>
      {data?.map((game, i) =>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <MatchBox {...game}/>
        </Grid>
      )}
    </Grid>
  );
}
 
export default NFLPanel;