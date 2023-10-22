import { Grid, Typography } from '@mui/material';

import { MatchBox, NoGamesLabel } from 'components';

import useFetchHockeyGames from 'hooks/useFetchHockeyGames';

const NHLPanel = () => {
  const { data, loading } = useFetchHockeyGames('https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard');

  if (loading) {
    return <Typography variant='h3'>Please wait while we fetch the info</Typography>;
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
 
export default NHLPanel;