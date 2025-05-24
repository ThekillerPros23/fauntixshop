"use client";
import { useState, useRef, useEffect } from "react";
import { useCarrito } from "@/context/CarritoContext";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";

export default function CarritoDeCompra() {
  const [abierto, setAbierto] = useState(false);
  const { items, eliminarDelCarrito } = useCarrito();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const total = items.reduce((sum, item) => sum + item.cantidad, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPagar = items.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.cantidad, 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer relative" onClick={() => setAbierto(!abierto)}>
        <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-white" />
        {total > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {total}
          </span>
        )}
      </div>

      {abierto && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-4">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">🛒 Tu carrito</h3>
          {items.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.cantidad} × {item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${(parseFloat(item.price.slice(1)) * item.cantidad).toFixed(2)}
                    </span>
                    <button onClick={() => eliminarDelCarrito(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 transition" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-sm font-semibold text-gray-800 dark:text-white mb-2">
                <span>Total:</span>
                <span>${totalPagar.toFixed(2)}</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                <CreditCard className="w-4 h-4" />
                Ir a pagar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
