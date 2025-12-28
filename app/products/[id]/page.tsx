import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';

// export const revalidate = 3600;

export const dynamicParams = true;


export async function generateStaticParams() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS App',
      },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const products = await res.json();

    // Only return the IDs that are numbers (filter out any unexpected data)
    return products
      .filter((product: any) => typeof product.id === 'number' && product.id > 0)
      .map((product: { id: number }) => ({
        id: product.id.toString(),
      }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function ProductDetailPage({
   params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  
  // Validate the ID format before making the API call
  if (!/^[1-9][0-9]*$/.test(id)) {
    return notFound();
  }
  
  try {
      const product = await getProduct(id);
      if (!product) {
          return notFound();
        }

    return <ProductDetails product={product} />;
  } catch (error) {
    console.error('Error fetching product in component:', error);
    
    // Check if it's a 403 error specifically and handle accordingly
    if (error instanceof Error && error.message.includes('403')) {
      console.error(`403 Forbidden error for product ID: ${id}`);
      return notFound();
    }
    
    return notFound();
  }
}
