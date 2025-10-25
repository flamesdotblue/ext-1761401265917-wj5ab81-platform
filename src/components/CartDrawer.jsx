import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, BadgeIndianRupee } from "lucide-react";

export default function CartDrawer({ open, onClose, items, subtotal, onQtyChange, onClear }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />
          <motion.aside
            key="panel"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
              <h2 className="font-semibold text-lg">Your Cart</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full grid place-items-center text-neutral-500">Your cart is empty.</div>
              ) : (
                items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-3 border border-neutral-200 rounded-xl p-3">
                    <img src={product.img} alt="" className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium truncate" title={product.name}>{product.name}</h4>
                          <p className="text-xs text-neutral-500">{product.unit} • ₹{product.price}</p>
                        </div>
                        <button
                          onClick={() => onQtyChange?.(product.id, 0)}
                          className="p-2 rounded-md hover:bg-neutral-100"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onQtyChange?.(product.id, qty - 1)}
                            className="h-8 w-8 rounded-full grid place-items-center border border-neutral-200 hover:bg-neutral-50"
                            aria-label="Decrease"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2ch] text-center">{qty}</span>
                          <button
                            onClick={() => onQtyChange?.(product.id, qty + 1)}
                            className="h-8 w-8 rounded-full grid place-items-center border border-neutral-200 hover:bg-neutral-50"
                            aria-label="Increase"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="font-medium">₹{product.price * qty}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-neutral-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Delivery</span>
                <span>Free on orders above ₹199</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClear}
                  className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50"
                >
                  Clear
                </button>
                <button
                  className="flex-[2] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  <BadgeIndianRupee className="h-4 w-4" />
                  Checkout
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
