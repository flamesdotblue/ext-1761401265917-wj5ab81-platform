import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";

const initialProducts = [
  {
    id: "p1",
    name: "Organic Bananas",
    price: 49,
    unit: "500g",
    category: "Fruits",
    rating: 4.6,
    deliveryMins: 15,
    inStock: true,
    img: "https://images.unsplash.com/photo-1571771710828-8046c9ba3e06?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p2",
    name: "Fresh Strawberries",
    price: 129,
    unit: "250g",
    category: "Fruits",
    rating: 4.7,
    deliveryMins: 20,
    inStock: true,
    img: "https://images.unsplash.com/photo-1437750769465-301382cdf094?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p3",
    name: "Broccoli",
    price: 39,
    unit: "1 pc",
    category: "Vegetables",
    rating: 4.5,
    deliveryMins: 12,
    inStock: true,
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p4",
    name: "Cherry Tomatoes",
    price: 59,
    unit: "200g",
    category: "Vegetables",
    rating: 4.4,
    deliveryMins: 18,
    inStock: true,
    img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p5",
    name: "Cow Milk",
    price: 64,
    unit: "1L",
    category: "Dairy",
    rating: 4.8,
    deliveryMins: 10,
    inStock: true,
    img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p6",
    name: "Greek Yogurt",
    price: 89,
    unit: "400g",
    category: "Dairy",
    rating: 4.6,
    deliveryMins: 25,
    inStock: true,
    img: "https://images.unsplash.com/photo-1514517220031-66ee4e52c588?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p7",
    name: "Brown Bread",
    price: 45,
    unit: "400g",
    category: "Bakery",
    rating: 4.2,
    deliveryMins: 22,
    inStock: true,
    img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p8",
    name: "Eggs (Free Range)",
    price: 110,
    unit: "12 pcs",
    category: "Bakery",
    rating: 4.7,
    deliveryMins: 16,
    inStock: true,
    img: "https://images.unsplash.com/photo-1517959105821-eaf2591984c2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p9",
    name: "Basmati Rice",
    price: 199,
    unit: "1kg",
    category: "Grains",
    rating: 4.5,
    deliveryMins: 30,
    inStock: true,
    img: "https://images.unsplash.com/photo-1604908812229-5091b9c54730?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p10",
    name: "Masoor Dal",
    price: 129,
    unit: "1kg",
    category: "Grains",
    rating: 4.3,
    deliveryMins: 28,
    inStock: true,
    img: "https://images.unsplash.com/photo-1604908553933-9e8e79fba2a9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p11",
    name: "Olive Oil Extra Virgin",
    price: 399,
    unit: "500ml",
    category: "Pantry",
    rating: 4.6,
    deliveryMins: 32,
    inStock: true,
    img: "https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p12",
    name: "Almonds",
    price: 249,
    unit: "500g",
    category: "Pantry",
    rating: 4.8,
    deliveryMins: 35,
    inStock: true,
    img: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function App() {
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({}); // id -> { product, qty }

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, search, selectedCategory]);

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartCount = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((s, i) => s + i.product.price * i.qty, 0), [cartItems]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      const qty = existing ? existing.qty + 1 : 1;
      return { ...prev, [product.id]: { product, qty } };
    });
  };

  const updateQty = (id, nextQty) => {
    setCart((prev) => {
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      const existing = prev[id];
      if (!existing) return prev;
      return { ...prev, [id]: { ...existing, qty: nextQty } };
    });
  };

  const clearCart = () => setCart({});

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header
        onSearch={setSearch}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <CategoryBar
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        <ProductGrid products={filtered} onAdd={addToCart} />
      </main>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        onQtyChange={updateQty}
        onClear={clearCart}
      />
    </div>
  );
}
