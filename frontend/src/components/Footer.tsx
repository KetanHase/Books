import React from 'react';
import {
   
  Container,
  
  Link,
  
  Typography,
} from '@mui/material';

const Footer: React.FC = () => {

  return (
   <>
       
         
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 4 ,py:4, backgroundColor:'#51606e'}}>
          {'Copyright © '}
          <Link href="/" color="textSecondary">
           Book Store
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
       
    </>
  );
};

export default Footer;