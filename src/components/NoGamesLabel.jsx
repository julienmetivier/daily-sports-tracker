import { Box, Typography } from "@mui/material";

const NoGamesLabel = () => {
  return ( 
      <Box sx={{m: '1rem'}}>
        <Typography variant='h5' color='white'>No games today</Typography>
      </Box>
  );
}
 
export default NoGamesLabel;