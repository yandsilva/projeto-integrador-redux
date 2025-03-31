export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product?: Product; // Para joins
};
