import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';

import { MATCH_DISPLAY } from 'consts';

import { retrieveDisplayFormat, setDisplayFormat } from '../../store/gamesSlice';

const ToggleDisplayFormat = () => {
  const dispatch = useDispatch();
  const displayFormat = useSelector((state) => retrieveDisplayFormat(state));

  const handleDisplayFormatChange = (selectedDisplayFormat) => {
    if (selectedDisplayFormat === null) return;
    if (selectedDisplayFormat === displayFormat) return;

    dispatch(setDisplayFormat({displayFormat: selectedDisplayFormat}));
  }

  return (
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
  );
}
 
export default ToggleDisplayFormat;