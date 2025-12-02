"use client";

import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface FilterItem {
  id: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  items: FilterItem[];
  value: string | null;
  onChange: (value: string | null) => void;
  allOptionId?: string;
  scrollable?: boolean;
  className?: string;
}

export function FilterGroup({
  title,
  items,
  value,
  onChange,
  allOptionId = "all",
  scrollable = false,
  className,
}: FilterGroupProps) {
  const handleClick = (itemId: string) => {
    if (itemId === allOptionId) {
      onChange(null);
    } else if (value === itemId) {
      onChange(null);
    } else {
      onChange(itemId);
    }
  };

  const isSelected = (itemId: string) => {
    if (itemId === allOptionId) {
      return value === null;
    }
    return value === itemId;
  };

  return (
    <div className={className}>
      <Text weight="medium" className="mb-4">
        {title}
      </Text>
      <div
        className={cn(
          "space-y-2",
          scrollable && "max-h-64 overflow-y-auto pr-2"
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "w-full text-left px-4 py-2.5 text-sm transition-all rounded-sm",
              isSelected(item.id)
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "bg-background-elevated border border-border hover:border-primary-500/30 text-foreground-muted hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
