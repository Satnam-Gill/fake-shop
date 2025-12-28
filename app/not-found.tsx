'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        gap: 2
      }}>
        <Typography variant="h1" fontWeight="bold" color="primary">404</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Typography color="text.secondary">The page you are looking for does not exist.</Typography>
        <Link href="/" passHref>
             <Button variant="contained">Go Home</Button>
        </Link>
      </Box>
    </Container>
  );
}
