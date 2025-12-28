'use client';

import { Card, CardContent, Box, Skeleton } from '@mui/material';

export default function ProductSkeleton() {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
             <Box sx={{ pt: '100%', position: 'relative' }}>
                <Skeleton variant="rectangular" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
             </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" height={30} width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width={60} sx={{ ml: 1 }} />
                </Box>
                <Skeleton variant="text" height={40} width="30%" />
            </CardContent>
        </Card>
    );
}
