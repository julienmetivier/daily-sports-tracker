import { Box, capitalize, Divider, Grid, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import { TeamLogo } from 'components';
import { IN_PROGRESS, FINAL, HALFTIME, END_PERIOD, DELAYED, COLORS } from 'consts';
import { getLocalGameTime } from 'utils';
import { 
  loserColor,
  winnerColor,
  gameFinished,
  MatchBoxScoreFadeInStyle
} from 'styling';

const MatchBoxLayered = ({
  status,
  statusCode,
  gameDatetime,
  teamAway,
  teamHome
}) => {
  const localGameTime = getLocalGameTime(gameDatetime);

  const TeamBlock = ({team, side}) => {
    const loserAndFinished = team.winner !== null && team.winner === false ? true : false;
    const fontColor = loserAndFinished ? loserColor : winnerColor;
    const logoOpacity = loserAndFinished ? 0.6 : 1;
    const sideIsRight = side === 'right';
    const otherSide = sideIsRight ? 'left' : 'right';

    const TeamScore = () => (
      [IN_PROGRESS, HALFTIME, END_PERIOD, FINAL, DELAYED].includes(statusCode) &&
        <Grid item xs={4} sm={4} md={4} sx={{textAlign: otherSide, p: '0.5rem'}}>
          <Typography variant='h5' sx={MatchBoxScoreFadeInStyle} color={fontColor}>{team.score}</Typography>
        </Grid>
    );

    return (
      <Grid 
        container
        item
        rowSpacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid 
          container
          item
          justifyContent="center"
          alignItems="center">
          <Grid item xs={9} sm='auto' md={9} sx={{px: '0.25rem'}} zeroMinWidth>
            <Typography sx={{fontSize: { xs: '0.80rem', sm: '1rem' }, fontWeight: 500}} color={fontColor} noWrap gutterBottom>{team.name}</Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <Typography sx={{fontSize: '0.75rem'}} color={fontColor} gutterBottom>{team.record}</Typography>
          </Grid>
        </Grid>
        { sideIsRight && <TeamScore /> }
        <Grid item xs={8} sm={8} md={8}>
          {team.logo !== null ?
            <TeamLogo 
              logoUrl={team.logo}
              teamName={team.name}
              opacity={logoOpacity}
              size={36}/>
            :
            <ImageNotSupportedIcon sx={{color: loserColor}} />
          }
        </Grid>
        { !sideIsRight && <TeamScore /> }
      </Grid>
    );
  };

  return ( 
    <Box sx={{ 
      mx: { sm: 0, md:'1rem' },
      my: '0.5rem',
      p: '0.25rem',
      borderRadius: '0.5rem',
      boxShadow: 4,
      backgroundColor: COLORS.HIGHLIGHT,
      height: '7.5rem',
      }}>
      <Grid container>
        <Grid item xs={12} md={12} justify="flex-end" alignItems="center">
          <Typography variant='body2' color={statusCode === FINAL ? gameFinished : 'white'}>{`(${localGameTime})`}</Typography>
        </Grid>
        <Grid container item>
          <Grid item xs={6} md={6}>
            <TeamBlock team={teamAway} side='left' />
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem color={COLORS.SECONDARY} sx={{ mr: "-1px" }}/>
          <Grid item xs={6} md={6}>
            <TeamBlock team={teamHome} side='right' />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} justify="flex-end" alignItems="center">
          <Typography color={statusCode === FINAL && gameFinished}>{capitalize(status)}</Typography>
        </Grid>
      </Grid>
    </Box> 
  );
}
 
export default MatchBoxLayered;