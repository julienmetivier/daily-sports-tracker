import { Grid, Typography } from '@mui/material';

import { MatchBox, PanelWrapper } from 'components';
import { NHL } from 'consts';

import useFetchHockeyGames from 'hooks/useFetchHockeyGames';

const NHLPanel = () => {
  const { data, loading } = useFetchHockeyGames('http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard');

  if (loading) {
    return <Typography variant='h3'>Please wait while we fetch the info</Typography>;
  }

  if (data.length === 0) {
    return <Typography variant='h3'>No {NHL} games today</Typography>;
  }

  return (
    <PanelWrapper leagueName={NHL}>
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
 
export default NHLPanel;