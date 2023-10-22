import { Grid, Typography } from '@mui/material';

import { MatchBox, NoGamesLabel } from 'components';

import useFetchCollegeFootballGames from 'hooks/useFetchCollegeFootballGames';

const NCAAFPanel = () => {
  const { data, loading } = useFetchCollegeFootballGames('https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard');

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
 
export default NCAAFPanel;