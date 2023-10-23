import { Box, Grid, LinearProgress } from '@mui/material';

const LinearProgressRevamp = () => 
  <LinearProgress sx={{ 
    borderRadius: '1rem',
    backgroundColor: '#646871',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#4e5157'
    }, 
    height: '1.75rem'}} 
  />;

const GameLoading = () => {
  return ( 
    <Box sx={{ 
      mx: '1rem',
      my: '0.5rem',
      p: '0.25rem',
      border: 1,
      borderRadius: '0.5rem',
      boxShadow: 1,
      backgroundColor: '#646871', 
      height: '7.5rem',
      }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Grid container justify="flex-end" alignItems="center">
              <Grid item xs={7} md={7}>
                <LinearProgressRevamp />
              </Grid>
              <Grid item xs={5} md={5}>
                <LinearProgressRevamp />
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} md={9}>
          <LinearProgressRevamp />
        </Grid>
        <Grid item xs={3} md={3}>
          <LinearProgressRevamp />
        </Grid>
        <Grid item xs={9} md={9}>
          <LinearProgressRevamp />
        </Grid>
        <Grid item xs={3} md={3}>
          <LinearProgressRevamp />
        </Grid>
      </Grid>
    </Box> 
   );
}

const LoadingPanel = () => {
  return ( 
    <Grid container spacing={2}>
      {[...Array(3)].map((e, i) => 
        <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
          <GameLoading />
        </Grid>
      )}
    </Grid>
  );
}
 
export default LoadingPanel;