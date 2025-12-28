import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';

// export const revalidate = 3600;

// export const dynamicParams = true;


export async function generateStaticParams() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const products = await res.json();

    return products.map((product: { id: number }) => ({
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
  try {
      const product = await getProduct(id);
      if (!product) {
          return notFound();
        }

    return <ProductDetails product={product} />;
  } catch (error) {
    console.error('Error fetching product in component:', error);
    return notFound();
  }
}
