'use client';

import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';


const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/' },
    { name: 'Create', path: '/products/create' },
    { name: 'About', path: '/about' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Fake Store
            </Typography>
            <List>
                {NAV_LINKS.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} component={Link} href={item.path}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar 
            position="sticky" 
            color="default" 
            elevation={0}
            sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ maxWidth: 'lg', mx: 'auto', width: '100%', px: { xs: 2, sm: 3 } }}>
                <Toolbar disableGutters sx={{ height: 64 }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    
                    <Typography
                        variant="h5"
                        component={Link}
                        href="/"
                        sx={{ 
                            flexGrow: 1, 
                            textDecoration: 'none', 
                            color: 'text.primary', 
                            fontWeight: 800,
                            letterSpacing: '-0.025em',
                            background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        FAKE STORE
                    </Typography>
                    
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {NAV_LINKS.map((item) => (
                                <Button 
                                    key={item.name} 
                                    component={Link} 
                                    href={item.path}
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </Box>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </AppBar>
    );

}
