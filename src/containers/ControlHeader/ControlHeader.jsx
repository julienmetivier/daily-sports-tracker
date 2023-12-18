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
import { ToggleLeagues } from 'containers';

const SwitchLabel = () => {
  const tooltipText = 'Get refreshed scores every 30 seconds';

  return (
    <Tooltip placement='top' title={tooltipText}>
      <Typography color={'white'}>Continuous updates</Typography>
    </Tooltip>
  );
};

const ControlSectionWrapper = ({children}) => {
  return (
    <Grid
      item
      xs={12}
      sm='auto'
      px={'0.5rem'}
    >
      {children}
    </Grid>
  );
}

const ControlHeader = ({ isContinuousUpdate, onContinuousUpdateChange }) => {
  return ( 
    <Box sx={{ 
      backgroundColor: COLORS.CONTROL,
      boxShadow: 2,
      borderRadius: 2,
      mx: '1rem',
      mb: '2rem',
      p: '1rem'
    }}>
      <Grid
        container
        rowSpacing={1}
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <ControlSectionWrapper>
          <FormGroup sx={{alignItems: 'center'}}>
            <FormControlLabel
              sx={{mx: 'auto'}}
              control={
                <Switch
                  checked={isContinuousUpdate}
                  onChange={onContinuousUpdateChange}
                />
              }
              label={<SwitchLabel />}
            />
          </FormGroup>
        </ControlSectionWrapper>
        <Divider orientation='vertical' flexItem color={COLORS.SECONDARY} />
        <ControlSectionWrapper>
          <ToggleLeagues />
        </ControlSectionWrapper>
      </Grid>
    </Box>
  );
}
 
export default ControlHeader;