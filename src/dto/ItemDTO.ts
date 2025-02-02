export interface ItemResponse {
    itemId: number;
    productId: number;
    name: string;
    quantity: number;
    price: number;
    variant: object;
    sku: string;
    subtotal: number;
    tax: number;
    totalPrice: number;
    productImage: string;
    productUrl: string;
    isInStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}