import { useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { PanelWrapper } from 'components';
import { COLORS } from 'consts';

const formatDate = (date) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[date.getDay()];
};

const DateSelectionPanel = ({ currentDate, setCurrentDate }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isSmallScreen);

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
      {isSmallScreen && (
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Hide Dates' : 'Show Dates'}
        </Button>
      )}
      <Collapse in={isOpen}>
        <Grid container justifyContent='space-between' spacing={1}>
          {dates.map((date, index) => (
            <Grid item xs={12} sm={2} key={index}>
              <Card 
                sx={{ backgroundColor: COLORS.HIGHLIGHT }}
              >
                <CardActionArea onClick={() => setCurrentDate(date)}>
                  <CardContent sx={{ padding: 0.5 }}>
                    { isSmallScreen ? (
                      <>
                        <Typography variant='body1'>
                          {formatDate(date)} ({date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })})
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {formatDate(date)}
                        </Typography>
                        <Divider variant="middle" />
                        <Typography variant="body2">
                          {date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </PanelWrapper>
  );
}

export default DateSelectionPanel;