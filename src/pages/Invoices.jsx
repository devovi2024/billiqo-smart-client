import { useState } from "react";
import { products } from "../data/products";

export default function Invoices() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="md:col-span-2">

        <h2 className="text-xl font-bold mb-4">
          Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                {p.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                ${p.price}
              </p>

              <button
                onClick={() => addToCart(p)}
                className="mt-3 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}

        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800">

        <h2 className="text-xl font-bold mb-4">
          Cart
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-500">
            Cart is empty
          </p>
        )}

        <div className="space-y-3">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2 dark:border-gray-800"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  {item.qty} × ${item.price}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}

        </div>

        <div className="mt-4 border-t pt-3 dark:border-gray-800">

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Generate Invoice
          </button>

        </div>

      </div>

    </div>
  );
}