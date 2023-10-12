import { Grid, Typography } from '@mui/material';

import { MatchBox, PanelWrapper, NoGamesLabel } from 'components';
import { NFL } from 'consts';

import useFetchFootballGames from 'hooks/useFetchFootballGames';

const NFLPanel = () => {
  const { data, loading } = useFetchFootballGames('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');

  if (loading) {
    return <Typography variant='h3'>Please wait while we fetch the info</Typography>;
  }

  if (data.length === 0) {
    return <NoGamesLabel leagueName={NFL} />;
  }

  return (
    <PanelWrapper leagueName={NFL}>
      <Grid container spacing={2}>
        {data?.map((game, i) =>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <MatchBox {...game}/>
          </Grid>
        )}
      </Grid>
    </PanelWrapper>
  );
}
 
export default NFLPanel;