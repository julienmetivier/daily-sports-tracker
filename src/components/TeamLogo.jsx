import { Box } from '@mui/material';

const TeamLogo = ({ logoUrl, teamName, opacity, size = 24 }) => (
  <Box
    component="img"
    sx={{
      height: size,
      width: size,
      opacity
    }}
    alt={teamName}
    src={logoUrl}
  />
);
 
export default TeamLogo;