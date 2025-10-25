import React from "react";
import { Star, Timer } from "lucide-react";

export default function ProductGrid({ products, onAdd }) {
  if (!products.length) {
    return (
      <div className="py-20 text-center text-neutral-500">No products found. Try different keywords or category.</div>
    );
  }

  return (
    <section className="pb-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-neutral-50">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium truncate" title={product.name}>{product.name}</h3>
            <p className="text-xs text-neutral-500">{product.unit} • {product.category}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500 shrink-0">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="text-xs text-neutral-700">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Timer className="h-4 w-4 text-green-600" />
            <span>{product.deliveryMins} min</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">₹{product.price}</div>
            <div className="text-[11px] text-neutral-500">incl. all taxes</div>
          </div>
        </div>
        <button
          onClick={() => onAdd?.(product)}
          className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-green-600 text-white py-2 text-sm font-medium hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
