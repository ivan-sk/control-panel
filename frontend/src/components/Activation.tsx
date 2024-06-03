import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "components/Navbar";

const Activation: React.FC = () => (
  <>
    <Navbar />
    <Container maxWidth='md' sx={{ mt: 8 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Activation
      </Typography>
      <Typography variant='body1'>Activation Page</Typography>
    </Container>
  </>
);

export default Activation;
