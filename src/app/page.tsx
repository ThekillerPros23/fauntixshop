"use client";
import Image from "next/image";
import CarritoDeCompra from "@/components/carritodecompra/components/CarritoDeCompra";
import { useCarrito } from "@/context/CarritoContext";

const products = [
  { id: 1, name: "Camiseta básica", price: "$19.99", image: "/products/shirt.jpg" },
  { id: 2, name: "Zapatillas deportivas", price: "$59.99", image: "/products/shoes.jpg" },
  { id: 3, name: "Mochila casual", price: "$39.99", image: "/products/backpack.jpg" },
  { id: 4, name: "Gorra urbana", price: "$14.99", image: "/products/cap.jpg" },
];

export default function Home() {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FauntixShop logo" width={40} height={40} />
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              FauntixShop
            </span>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
              <a href="#" className="hover:text-black dark:hover:text-white transition">Inicio</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition">Productos</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition">Contacto</a>
            </nav>
            <CarritoDeCompra />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center sm:text-left">
          Descubre nuestros productos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{product.price}</p>
                <button
                  onClick={() => agregarAlCarrito(product)}
                  className="w-full bg-black text-white font-semibold py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 dark:border-zinc-700 mt-12 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} <strong>FauntixShop</strong>. Todos los derechos reservados.
      </footer>
    </div>
  );
}
