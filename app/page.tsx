'use client';

import { useState, useMemo, useEffect } from 'react';
import { Container, Typography, Box, Alert, Button, Grid, Pagination } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import ProductFilterBar from '@/components/products/ProductFilterBar';
import ProductSkeleton from '@/components/products/ProductSkeleton';

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Pagination State
  const [page, setPage] = useState(1);

  const { data: products = [], isLoading, isError } = useProducts(selectedCategory);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(lowerSearch));
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    return result;
  }, [products, search, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
      setPage(1);
  }, [selectedCategory, search, sortOrder]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
  };

  const handleSortChange = (val: 'asc' | 'desc') => {
    setSortOrder(val);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Fake Store
        </Typography>
        <Button variant="contained" href="/products/create" sx={{ mt: 2 }}>
          Create New Product
        </Button>
      </Box>

      <ProductFilterBar 
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

       {isError && (
        <Alert severity="error" sx={{ mb: 4 }}>Failed to load products. Please try again later.</Alert>
      )}

      <Grid container spacing={3}>
        {isLoading ? (
             Array.from(new Array(6)).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProductSkeleton />
                </Grid>
             ))
        ) : (
            <>
                {displayedProducts.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </>
        )}
      </Grid>
      
      {!isLoading && displayedProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography color="text.secondary">No products found.</Typography>
        </Box>
      )}

      {!isLoading && filteredProducts.length > 0 && (
         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
            />
         </Box>
      )}
    </Container>
  );
}
