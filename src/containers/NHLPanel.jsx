import { Grid } from '@mui/material';

import { LoadingPanel, MatchBox, NoGamesLabel } from 'components';
import { DATA_URLS } from 'consts';

import useFetchHockeyGames from 'hooks/useFetchHockeyGames';

const NHLPanel = () => {
  const { data, loading } = useFetchHockeyGames(DATA_URLS.NHL);

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
 
export default NHLPanel;