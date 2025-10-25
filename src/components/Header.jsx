import React, { useState } from "react";
import { ShoppingCart, Search, MapPin, User, Menu, X } from "lucide-react";

export default function Header({ onSearch, cartCount, onOpenCart }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex items-center gap-2 mr-2">
          <div className="h-9 w-9 rounded-xl bg-green-600 grid place-items-center text-white font-bold">G</div>
          <span className="font-semibold text-lg tracking-tight">GrocerNow</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-neutral-700">
          <MapPin className="h-4 w-4 text-green-600" />
          <span>Deliver to</span>
          <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200">Home</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-auto w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
              placeholder="Search for fruits, snacks, dairy..."
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <button className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50">
            <User className="h-4 w-4" />
            <span className="text-sm">Account</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-6 min-w-[1.5rem] px-1 rounded-full bg-white text-green-700 text-xs grid place-items-center border border-green-600">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 px-4 py-3 space-y-2 bg-white">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100">Account</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100">Orders</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100">Help</button>
        </div>
      )}
    </header>
  );
}
