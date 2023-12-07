import { 
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Tooltip,
  Typography
} from '@mui/material';

import { COLORS } from 'consts';
import { ToggleLeagues, ToggleDisplayFormat } from 'containers';

const SwitchLabel = () => {
  const tooltipText = 'Get refreshed scores every 30 seconds';

  return (
    <Tooltip placement='top' title={tooltipText}>
      <Typography color={'white'}>Continuous updates</Typography>
    </Tooltip>
  );
};

const ControlHeader = ({ isContinuousUpdate, onContinuousUpdateChange }) => {
  return ( 
    <Box sx={{ 
      backgroundColor: '#77889982',
      boxShadow: 2,
      borderRadius: 2,
      mx: '1rem',
      mb: '2rem',
      p: '1rem'
    }}>
      <Grid container>
        <Grid item xs={12} sm={4} md={4} lg={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isContinuousUpdate}
                  onChange={onContinuousUpdateChange}
                />
              }
              label={<SwitchLabel />}
            />
          </FormGroup>
        </Grid>
        <Divider orientation="vertical" flexItem color={COLORS.SECONDARY} />
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <ToggleLeagues />
        </Grid>
        <Divider orientation="vertical" flexItem color={COLORS.SECONDARY} />
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <ToggleDisplayFormat />
        </Grid>
      </Grid>
    </Box>
  );
}
 
export default ControlHeader;