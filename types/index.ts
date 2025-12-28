export type Category = string;

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CreateProductParams {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
