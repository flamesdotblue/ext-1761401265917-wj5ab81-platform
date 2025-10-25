import React from "react";
import { motion } from "framer-motion";

export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {categories.map((c) => {
          const active = selected === c;
          return (
            <motion.button
              layout
              key={c}
              onClick={() => onSelect?.(c)}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-full border text-sm transition-colors whitespace-nowrap ${
                active
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {c}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
