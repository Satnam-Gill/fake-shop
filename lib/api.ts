import { CreateProductParams, Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NextJS App",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} at ${url}`);
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Fetch Error at ${url}:`, error);
    throw error;
  }
}

export const getProducts = async (
  sort: "asc" | "desc" = "asc",
  limit?: number
): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (sort) params.append("sort", sort);
  if (limit) params.append("limit", String(limit));

  return fetcher<Product[]>(`/products?${params.toString()}`);
};

export const getProductsByCategory = async (
  category: string,
  sort: "asc" | "desc" = "asc"
): Promise<Product[]> => {
  return fetcher<Product[]>(`/products/category/${category}?sort=${sort}`);
};

export const getProduct = async (id: string): Promise<Product> => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetcher<Product>(`/products/${id}`);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("403") &&
        attempt === 3
      ) {
        throw error;
      }
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  throw new Error("Failed to fetch product after multiple attempts");
};

export const getCategories = async (): Promise<string[]> => {
  return fetcher<string[]>("/products/categories");
};

export const createProduct = async (
  product: CreateProductParams
): Promise<Product> => {
  return fetcher<Product>("/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
