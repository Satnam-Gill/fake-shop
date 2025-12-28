'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, TextField, Button, MenuItem, Typography, Alert, Grid } from '@mui/material';
import { CreateProductParams } from '@/types';
import { useCategories, useCreateProduct } from '@/hooks/useProducts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ... (schema remains)
const productSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    price: z.coerce.number().positive('Price must be a positive number'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    image: z.string().url('Must be a valid URL'),
    category: z.string().min(1, 'Category is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm() {
    const { data: categories = [] } = useCategories();
    const createMutation = useCreateProduct();
    const router = useRouter();
    const [successMsg, setSuccessMsg] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            title: '',
            price: 0,
            description: '',
            image: 'https://i.pravatar.cc',
            category: ''
        }
    });

    const onSubmit = (data: ProductFormData) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                setSuccessMsg('Product created successfully!');
                reset();
                // Optional: Redirect
                // router.push('/');
            },
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {createMutation.isError && (
                <Alert severity="error" sx={{ mb: 3 }}>Failed to create product.</Alert>
            )}
            {successMsg && (
                <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>
            )}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Product Title"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        {...register('price')}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        select
                        fullWidth
                        label="Category"
                        {...register('category')}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        defaultValue=""
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Image URL"
                        {...register('image')}
                        error={!!errors.image}
                        helperText={errors.image?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        disabled={isSubmitting || createMutation.isPending}
                        sx={{ py: 1.5 }}
                    >
                        {isSubmitting || createMutation.isPending ? 'Creating...' : 'Create Product'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
