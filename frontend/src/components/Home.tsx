import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from "components/Navbar";

const Home: React.FC = () => (
  <>
    <Navbar />
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Typography variant="body1">
        Welcome to the Landing Page
      </Typography>
    </Container>
  </>
);

export default Home;
