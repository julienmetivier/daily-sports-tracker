import { Box, Typography } from "@mui/material";

const PanelWrapper = ({leagueName, children}) => {
  return ( 
    <>
      <Box sx={{mx: '2rem'}}>
        <Typography variant='h6' color='#FDFDFB' textAlign='left'>{leagueName}</Typography>
      </Box>
      <Box sx={{
        border: 1,
        borderColor: '#FDFDFB',
        boxShadow: 2,
        borderRadius: 2,
        mx: '1rem',
        mb: '2rem',
      }}>
        {children}
      </Box>
    </>
   );
}
 
export default PanelWrapper;