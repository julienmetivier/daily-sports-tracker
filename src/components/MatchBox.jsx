import { Box, Grid, Typography, capitalize } from '@mui/material';

import { IN_PROGRESS, FINAL, HALFTIME } from 'consts';

const loserColor = '#424347';
const winnerColor = 'black';
const gameFinished = loserColor;

const TeamLogo = ({ logoUrl, teamName, opacity }) => (
  <Box
    component="img"
    sx={{
      height: 24,
      width: 24,
      opacity
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

  const TeamLine = ({team}) => {
    const loserAndFinished = team.winner !== null && team.winner === false ? true : false;
    const fontColor = loserAndFinished ? loserColor : winnerColor;
    const logoOpacity = loserAndFinished ? 0.6 : 1;
    return (
      <>
        <Grid item xs={6} md={6} sx={{textAlign: "right"}}>
          <Typography color={fontColor}>{team.name}</Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography color={fontColor}>{team.record}</Typography>
        </Grid>
        <Grid item xs={1} md={1}>
          <TeamLogo logoUrl={team.logo} teamName={team.name} opacity={logoOpacity}/>
        </Grid>
        { [IN_PROGRESS, HALFTIME, FINAL].includes(statusCode) &&
          <Grid item xs={3} md={3}>
            <Typography variant='h5' color={fontColor}>{team.score}</Typography>
          </Grid>
        }
      </>
    );
  }

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
                <Typography variant='h6' color={statusCode === FINAL && gameFinished}>{capitalize(status)}</Typography>
              </Grid>
              <Grid item xs={5} md={5}>
                <Typography color={statusCode === FINAL ? gameFinished : 'white'}>{`(${localGameTime})`}</Typography>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid 
            container 
            direction="row"
            alignItems="center"
          >
            <TeamLine team={teamAway} />
            <TeamLine team={teamHome} />
          </Grid>
        </Grid>
      </Grid>
    </Box> 
  );
}
 
export default MatchBox;