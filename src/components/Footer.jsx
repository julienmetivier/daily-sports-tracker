import { Box, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

import { COLORS } from 'consts';

const Footer = () => {
  return ( 
    <footer className="footer">
      <Box sx={{
        backgroundColor: COLORS.ACCENT,
        color: 'white',
        padding: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Link href="https://github.com/julienmetivier/daily-sports-tracker" underline="none" color="inherit">
          <Box display="flex" alignItems="center">
            <GitHubIcon />
            <Box ml={1}>
              <Typography variant="body1">Daily Sports Tracker</Typography>
            </Box>
          </Box>
        </Link>
      </Box>
    </footer>
  );
}
 
export default Footer;