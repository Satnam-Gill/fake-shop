'use client';

import { useEffect } from 'react';
import { Box, Typography, Button, Container, Alert } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        <Typography variant="h4" fontWeight="bold" gutterBottom>Something went wrong!</Typography>
        <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
            {error.message || 'An unexpected error occurred.'}
        </Alert>
        <Button 
            variant="contained" 
            startIcon={<RefreshIcon />}
            onClick={() => reset()}
            sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    </Container>
  );
}
