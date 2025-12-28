'use client';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useCategories } from '@/hooks/useProducts';

import { useEffect, useState } from 'react';

interface ProductFilterProps {
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: 'asc' | 'desc') => void;
}

export default function ProductFilterBar({ onSearchChange, onCategoryChange, onSortChange }: ProductFilterProps) {
    const { data: categories = [] } = useCategories();
    const [searchTerm, setSearchTerm] = useState('');
    

    
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, onSearchChange]);

    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4, alignItems: 'center' }}>
            <TextField 
                label="Search Products" 
                variant="outlined" 
                size="small" 
                sx={{ flexGrow: 1, minWidth: '200px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    defaultValue=""
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort Price</InputLabel>
                <Select
                    label="Sort Price"
                    defaultValue="asc"
                    onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
                >
                    <MenuItem value="asc">Low to High</MenuItem>
                    <MenuItem value="desc">High to Low</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
