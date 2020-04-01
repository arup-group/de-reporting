import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export const Copyright: React.FC<{}> = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://arup.com/">
            {'Arup '}
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
  }