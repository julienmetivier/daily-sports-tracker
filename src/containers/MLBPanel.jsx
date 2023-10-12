import { Grid, Typography } from '@mui/material';

import { MatchBox, PanelWrapper } from 'components';
import { MLB } from 'consts';

import useFetchBaseballGames from 'hooks/useFetchBaseballGames';

const MLBPanel = () => {
  const { data, loading } = useFetchBaseballGames('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');

  if (loading) {
    return <Typography variant='h3'>Please wait while we fetch the info</Typography>;
  }

  if (data.length === 0) {
    return <Typography variant='h3'>No {MLB} games today</Typography>;
  }

  return (
    <PanelWrapper leagueName={MLB}>
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
 
export default MLBPanel;