interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "T-Shirt", price: 19.99 },
  { id: 2, name: "Jeans", price: 49.99 },
  { id: 3, name: "Sneakers", price: 79.99 },
  { id: 4, name: "Hat", price: 14.99 },
];

import { useState } from "react";

export const ShoppingCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addProduct = (product: Product) => () => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };

    const removeProduct = (itemToRemove: CartItem) => () => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === itemToRemove.product.id);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.product.id === itemToRemove.product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter(item => item.product.id !== itemToRemove.product.id);
            }
        });
    };

    const clearProduct = (itemToClear: CartItem) => () => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== itemToClear.product.id));
    };

    return <div>
        <h1>Shopping Cart</h1>
        <h2>Products</h2>
        <ul>
            {PRODUCTS.map(product => (
                <li key={product.id}>{product.name} - {product.price.toFixed(2)} €&nbsp;<button onClick={addProduct(product)}>Add to Cart</button></li>
            ))}
        </ul>
        <h2>Cart</h2>
        <ul>
            {cart.map(item => (
                <li key={item.product.id}>
                    {item.product.name} x {item.quantity} - {(item.product.price * item.quantity).toFixed(2)} €&nbsp;
                    <button onClick={removeProduct(item)}>-</button> 
                    <button onClick={addProduct(item.product)}>+</button> 
                    <button onClick={clearProduct(item)}>Remove</button>
                </li>
            ))}
        </ul>
        <h3>
            Total: {cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)} €&nbsp;
        </h3>
    </div>;
}