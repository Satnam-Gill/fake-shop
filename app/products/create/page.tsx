'use client';

import { Container, Typography, Paper } from '@mui/material';
import ProductForm from '@/components/products/ProductForm';

export default function CreateProductPage() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" textAlign="center">
                Create New Product
            </Typography>
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <ProductForm />
            </Paper>
        </Container>
    );
}
