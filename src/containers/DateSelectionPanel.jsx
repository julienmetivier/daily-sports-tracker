import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { PanelWrapper } from 'components';
import { COLORS } from 'consts';

const formatDate = (date, isMobile = false) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const abbreviatedDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return isMobile ? abbreviatedDaysOfWeek[date.getDay()] : daysOfWeek[date.getDay()];
};

const DateSelectionPanel = ({ currentDate, setCurrentDate }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const dates = [
    new Date(currentDate.getTime() - 2 * oneDayInMilliseconds),
    new Date(currentDate.getTime() - oneDayInMilliseconds),
    currentDate,
    new Date(currentDate.getTime() + oneDayInMilliseconds),
    new Date(currentDate.getTime() + 2 * oneDayInMilliseconds),
  ];

  return (
    <PanelWrapper>
      {isSmallScreen ? (
        <ToggleButtonGroup
          value={currentDate.getTime()}
          exclusive
          onChange={(event, value) => {
            if (value !== null) setCurrentDate(new Date(value));
          }}
          aria-label="day selection"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {dates.map((day) => (
            <ToggleButton
              key={day}
              value={day.getTime()}
              aria-label={formatDate(day)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                width: '70px',
                height: '40px',
                border: '1px solid',
                borderRadius: '10px',
                fontSize: '0.875rem',
                backgroundColor: currentDate.getTime() === day.getTime() ? '#4d4d4d' : 'transparent',
              }}
            >
              <Typography variant="body2" color='#F0EAD6'>{formatDate(day, true)}</Typography>
              <div style={{ fontSize: '0.65rem', color: 'gray' }}>
                {day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      ) : (
        <Grid container justifyContent='space-between' spacing={1}>
          {dates.map((date, index) => (
            <Grid item xs={12} sm={2} key={index}>
              <Card 
                sx={{ backgroundColor: COLORS.HIGHLIGHT }}
              >
                <CardActionArea onClick={() => setCurrentDate(date)}>
                  <CardContent sx={{ padding: 0.5 }}>
                    <>
                      <Typography variant='h6'>
                        {formatDate(date)}
                      </Typography>
                      <Divider variant="middle" />
                      <Typography variant="body2">
                        {date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                      </Typography>
                    </>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PanelWrapper>
  );
}

export default DateSelectionPanel;
