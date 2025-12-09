// Product types from Fake Store API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// User/Auth types
export interface User {
  id: string;
  email: string;
  name: string;
}

// Theme types
export type Theme = "light" | "dark";

// API Response types
export interface ApiError {
  message: string;
}
