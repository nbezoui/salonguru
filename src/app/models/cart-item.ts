// models/product.ts
export interface Product {
    price: number;
    id: string;
    name: string;
    description: string;
    image: string;
    quantity: number;
  }
  
  // models/cart-item.ts
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  