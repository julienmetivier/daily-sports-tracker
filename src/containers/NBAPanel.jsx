import { Grid, Typography } from '@mui/material';

import { MatchBox, NoGamesLabel } from 'components';

import useFetchBasketballGames from 'hooks/useFetchBasketballGames';

const MLBPanel = () => {
  const { data, loading } = useFetchBasketballGames('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');

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
 
export default MLBPanel;