import { ItemResponse } from "./ItemDTO";

export interface CartRepsonse {
  cartId: string;
  userId: number;
  items: Array<ItemResponse>;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalPrice: number;
  currency: string;
  couponCode: string;
  discountsApplied: number;
  isSavedForLater: boolean;
  createdAt: Date;
  updatedAt: Date;
}