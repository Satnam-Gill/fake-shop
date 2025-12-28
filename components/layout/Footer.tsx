'use client';

import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        px: 2,
        mt: 'auto',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" component="div" fontWeight="800" sx={{ mb: 2, background: 'linear-gradient(45deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
              FAKE STORE
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 300, lineHeight: 1.7 }}>
              Experience the best of modern e-commerce. Built with Next.js and Material UI for speed, accessibility, and style.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <IconButton color="inherit" size="small" sx={{ color: '#94a3b8', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#1DA1F2', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#E1306C', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <InstagramIcon />
                </IconButton>
                <IconButton color="inherit" size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#0077B5', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <LinkedInIcon />
                </IconButton>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'white', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {['About', 'Careers', 'Brand', 'Blog'].map((item) => (
                    <Box component="li" key={item} sx={{ mb: 1.5 }}>
                        <Link href="#" color="inherit" underline="none" sx={{ color: '#94a3b8', fontSize: '0.875rem', transition: '0.2s', '&:hover': { color: 'white' } }}>
                            {item}
                        </Link>
                    </Box>
                ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'white', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
              Help
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {['Support', 'Terms', 'Privacy', 'Contact'].map((item) => (
                    <Box component="li" key={item} sx={{ mb: 1.5 }}>
                        <Link href="#" color="inherit" underline="none" sx={{ color: '#94a3b8', fontSize: '0.875rem', transition: '0.2s', '&:hover': { color: 'white' } }}>
                            {item}
                        </Link>
                    </Box>
                ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
             <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'white', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    style={{ 
                        flex: 1, 
                        padding: '10px 14px', 
                        borderRadius: '4px', 
                        border: '1px solid #334155', 
                        backgroundColor: '#1e293b', 
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.875rem'
                    }} 
                />
                <Box 
                    component="button" 
                    sx={{ 
                        bgcolor: '#3b82f6', 
                        color: 'white', 
                        border: 'none', 
                        px: 3, 
                        py: 1, 
                        borderRadius: 1, 
                        fontWeight: 'bold', 
                        cursor: 'pointer',
                        transition: '0.2s',
                        '&:hover': { bgcolor: '#2563eb' }
                    }}
                >
                    Join
                </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
                © {new Date().getFullYear()} Fake Store. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, md: 0 } }}>
                <Link href="#" underline="none" sx={{ color: '#64748b', fontSize: '0.875rem', '&:hover': { color: '#94a3b8' } }}>Privacy Policy</Link>
                <Link href="#" underline="none" sx={{ color: '#64748b', fontSize: '0.875rem', '&:hover': { color: '#94a3b8' } }}>Terms of Service</Link>
            </Box>
        </Box>
      </Container>
    </Box>
  );
}
