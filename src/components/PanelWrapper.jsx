import { Box, Typography } from "@mui/material";

import { COLORS } from "consts";

const PanelWrapper = ({leagueName, children}) => {
  return ( 
    <>
      <Box sx={{mx: '2rem'}}>
        <Typography variant='h6' color={COLORS.LIGHT} textAlign='left'>{leagueName}</Typography>
      </Box>
      <Box sx={{
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: COLORS.ACCENT,
        mx: '1rem',
        mb: '2rem',
        p: '0.25rem'
      }}>
        {children}
      </Box>
    </>
   );
}
 
export default PanelWrapper;