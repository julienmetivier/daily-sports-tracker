import { Box, FormControlLabel, FormGroup, Switch, Tooltip, Typography } from '@mui/material';

const SwitchLabel = () => {
  const tooltipText = 'Get refreshed scores every 30 seconds';

  return (
    <Tooltip placement='top' title={tooltipText}>
      <Typography color={'white'}>Continuous updates</Typography>
    </Tooltip>
  );
}

const ControlHeader = ({ isContinuousUpdate, onContinuousUpdateChange }) => {
  return ( 
    <Box sx={{ 
      border: 1,
      borderColor: '#FDFDFB',
      boxShadow: 2,
      borderRadius: 2,
      mx: '1rem',
      mb: '2rem',
      p: '1rem'
    }}>
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
    </Box>
  );
}
 
export default ControlHeader;