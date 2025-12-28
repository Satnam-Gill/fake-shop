import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';
import { Metadata } from 'next';

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


export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  
  if (!/^[1-9][0-9]*$/.test(id)) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    };
  }
  
  const product = await getProduct(id);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    };
  }
  
  return {
    title: product.title,
    description: product.description,
  };
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
  
  const product = await getProduct(id);
  if (!product) {
      return notFound();
    }

  return <ProductDetails product={product} />;
}
