import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  function Footer(props) {
    const { description, title } = props;
  
    return (
      <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link color="inherit" href="#">
              Contact Us
            </Link>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ mx: 1 }}>
              |
            </Typography>
            <Link color="inherit" href="#">
              Social Media
            </Link>
          </Box>
          <Copyright />
        </Container>
      </Box>
    );
  }

Footer.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

export default Footer;