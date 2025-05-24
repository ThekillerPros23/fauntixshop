"use client";
import { createContext, useContext, useState } from "react";

interface Producto {
  id: number;
  name: string;
  price: string;
  cantidad: number;
}

interface CarritoContextProps {
  items: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  eliminarDelCarrito: (id: number) => void;
  limpiarCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Producto[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const limpiarCarrito = () => setItems([]);

  return (
    <CarritoContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
