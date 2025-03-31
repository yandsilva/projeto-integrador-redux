// src/interfaces/product.interface.ts
export interface IProduct {
  id: string;
  name: string;
  description: string;
  mark: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  images: IImage[];
}

export interface IProductCreate {
  name: string;
  description: string;
  mark: string;
  price: string;
  categoryId: string;
}

// src/interfaces/category.interface.ts
export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreate {
  name: string;
}

// src/interfaces/image.interface.ts
export interface IImage {
  id: string;
  path: string;
  productId: string;
}
