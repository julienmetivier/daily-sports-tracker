import { useSelector, useDispatch } from 'react-redux';
import { 
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';

import { COLORS, MATCH_DISPLAY } from 'consts';
import { ToggleLeagues } from 'containers';

import { retrieveDisplayFormat, setDisplayFormat } from '../../store/gamesSlice';

const SwitchLabel = () => {
  const tooltipText = 'Get refreshed scores every 30 seconds';

  return (
    <Tooltip placement='top' title={tooltipText}>
      <Typography color={'white'}>Continuous updates</Typography>
    </Tooltip>
  );
};

const ControlHeader = ({ isContinuousUpdate, onContinuousUpdateChange }) => {
  const dispatch = useDispatch();
  const displayFormat = useSelector((state) => retrieveDisplayFormat(state));

  const handleDisplayFormatChange = (selectedDisplayFormat) => {
    if (selectedDisplayFormat === null) return;
    if (selectedDisplayFormat === displayFormat) return;

    dispatch(setDisplayFormat({displayFormat: selectedDisplayFormat}));
  }

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
          <ToggleButtonGroup
            value={displayFormat}
            size='small'
            exclusive
            onChange={(event, displayChangeValue) => handleDisplayFormatChange(displayChangeValue)}
            aria-label='match display'
          >
            <ToggleButton value={MATCH_DISPLAY.LINEAR} aria-label='linear display'>
              <AlignHorizontalLeftIcon />
            </ToggleButton>
            <ToggleButton value={MATCH_DISPLAY.MULTI} aria-label='multi-level display'>
              <AlignHorizontalCenterIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
 
export default ControlHeader;