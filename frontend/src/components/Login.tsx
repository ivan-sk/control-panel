import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { getGoogleOAuthURL } from "utils/googleOAuth";

const Login: React.FC = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='80vh'
      bgcolor='background.default'
      padding={2}
    >
      <Typography variant='h4' gutterBottom>
        Welcome
      </Typography>
      <Button variant='contained' href={getGoogleOAuthURL()}>
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
