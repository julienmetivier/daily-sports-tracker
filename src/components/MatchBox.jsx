import { Box, capitalize, Grid, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import { TeamLogo } from 'components';
import { IN_PROGRESS, FINAL, HALFTIME, END_PERIOD, DELAYED, COLORS } from 'consts';
import { getLocalGameTime } from 'utils';
import { 
  loserColor,
  winnerColor,
  gameFinishedColor,
  MatchBoxScoreFadeInStyle
} from 'styling';

const dynamicFontVariant = { 
  typography: { 
    md: 'body1',
    sm: 'body1',
    xs: 'body2'
  }
};

const MatchBox = ({
  status,
  statusCode,
  gameDatetime,
  teamAway,
  teamHome
}) => {
  const localGameTime = getLocalGameTime(gameDatetime);

  const TeamLine = ({team}) => {
    const loserAndFinished = team.winner !== null && team.winner === false ? true : false;
    const fontColor = loserAndFinished ? loserColor : winnerColor;
    const logoOpacity = loserAndFinished ? 0.6 : 1;
    return (
      <>
        <Grid item xs={6} sm={6} md={6} sx={{textAlign: "right"}}>
          <Typography sx={dynamicFontVariant} color={fontColor} noWrap>{team.name}</Typography>
        </Grid>
        <Grid item xs={3} sm={2} md={2}>
          <Typography sx={dynamicFontVariant} color={fontColor}>{team.record}</Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          {team.logo !== null ?
            <TeamLogo logoUrl={team.logo} teamName={team.name} opacity={logoOpacity}/>
            :
            <ImageNotSupportedIcon sx={{color: loserColor}} />
          }
        </Grid>
        { [IN_PROGRESS, HALFTIME, END_PERIOD, FINAL, DELAYED].includes(statusCode) &&
          <Grid item xs={2} sm={3} md={3}>
            <Typography variant='h5' sx={MatchBoxScoreFadeInStyle} color={fontColor}>{team.score}</Typography>
          </Grid>
        }
      </>
    );
  };

  return ( 
    <Box sx={{ 
      mx: '1rem',
      my: '0.5rem',
      p: '0.25rem',
      borderRadius: '0.5rem',
      boxShadow: 4,
      backgroundColor: COLORS.HIGHLIGHT,
      height: '7.5rem',
      }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Grid container justify="flex-end" alignItems="center">
              <Grid item xs={7} md={7}>
                <Typography variant='h6' color={statusCode === FINAL && gameFinishedColor}>{capitalize(status)}</Typography>
              </Grid>
              <Grid item xs={5} md={5}>
                <Typography color={statusCode === FINAL ? gameFinishedColor : 'white'}>{`(${localGameTime})`}</Typography>
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