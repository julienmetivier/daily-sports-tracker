import { Box, Grid, Typography, capitalize } from '@mui/material';

import { IN_PROGRESS, FINAL } from 'consts';

const TeamLogo = ({ logoUrl, teamName }) => (
  <Box
    component="img"
    sx={{
      height: 24,
      width: 24,
    }}
    alt={teamName}
    src={logoUrl}
  />
);

const MatchBox = ({
    status, 
    statusCode,
    gameDatetime, 
    teamAway, 
    teamHome
  }) => {
  const localGameTime = new Date(gameDatetime).toLocaleTimeString('en-us', {
    hour: 'numeric', 
    minute: 'numeric'
  });

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
                <Typography variant='h6'>{capitalize(status)}</Typography>
              </Grid>
              <Grid item xs={5} md={5}>
                <Typography sx={{color: 'white'}}>{`(${localGameTime})`}</Typography>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid 
            container 
            direction="row"
            alignItems="center"
          >
            <Grid item xs={6} md={6} sx={{textAlign: "right"}}>
              <Typography>{teamAway.name}</Typography>
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography>{teamAway.record}</Typography>
            </Grid>
            <Grid item xs={1} md={1}>
              <TeamLogo logoUrl={teamAway.logo} teamName={teamAway.name} />
            </Grid>
            { [IN_PROGRESS, FINAL].includes(statusCode) && 
              <Grid item xs={3} md={3}>
                <Typography variant='h5'>{teamAway.score}</Typography>
              </Grid>
            }
            <Grid item xs={6} md={6} sx={{textAlign: "right"}}>
              <Typography>{teamHome.name}</Typography>
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography>{teamHome.record}</Typography>
            </Grid>
            <Grid item xs={1} md={1}>
              <TeamLogo logoUrl={teamHome.logo} teamName={teamHome.name} />
            </Grid>
            { [IN_PROGRESS, FINAL].includes(statusCode) && 
              <Grid item xs={3} md={3}>
                <Typography variant='h5'>{teamHome.score}</Typography>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Box> 
  );
}
 
export default MatchBox;