import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "utils/axios";
import { useAuth } from "contexts/AuthContext";

const GoogleOAuth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthenticatedUser } = useAuth();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/oauth/google/login`, {
          code,
        })
        .then((response) => {
          setAuthenticatedUser(response.data.user);
          navigate("/");
        })
        .catch((error) => {
          // @todo: display error to user
          setAuthenticatedUser(null);
          console.error("Error during authentication", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [code, navigate, setAuthenticatedUser]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <CircularProgress size={80} thickness={5} />
      <Typography variant='h6' color='textSecondary' marginTop={2}>
        Logging in...
      </Typography>
    </Box>
  );
};

export default GoogleOAuth;
