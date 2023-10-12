import { Box, Typography } from "@mui/material";

import PanelWrapper from "./PanelWrapper";

const NoGamesLabel = ({leagueName}) => {
  return ( 
    <PanelWrapper leagueName={leagueName}>
      <Box sx={{m: '1rem'}}>
        <Typography variant='h5' color='white'>No games today</Typography>
      </Box>
    </PanelWrapper> 
  );
}
 
export default NoGamesLabel;