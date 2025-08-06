"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "~/lib/utils";

interface SortOption {
  value: string;
  label: string;
}

interface Props {
  sortVal?: string;
}

const SORT_OPTIONS: readonly SortOption[] = [
  { value: "popular", label: "Popular" },
  { value: "top-rated", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
] as const;

const SORT_PARAM_KEY = "sort";
const DEFAULT_SORT = "popular";

export default function ShopSortWiget({ sortVal = DEFAULT_SORT }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSort = useCallback(
    (sortValue: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (sortValue === sortVal) return;

      if (sortValue === DEFAULT_SORT) {
        params.delete(SORT_PARAM_KEY);
      } else {
        params.set(SORT_PARAM_KEY, sortValue);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [sortVal, pathname, router, searchParams],
  );

  return (
    <div className="flex items-center gap-3">
      <small className="text-nowrap">Sotr By:</small>
      <div className="flex w-fit items-center divide-x divide-zinc-300 rounded-md bg-white p-2">
        {SORT_OPTIONS.map(({ label, value }) => {
          const isSelected = sortVal === value;
          return (
            <button
              key={value}
              className={cn(
                "hover:text-primary flex items-center px-3 py-0.5 text-nowrap transition-colors",
                {
                  "text-primary": isSelected,
                },
              )}
              onClick={() => updateSort(value)}
              aria-pressed={isSelected}
              aria-label={`Sort by ${label.toLowerCase()}`}
            >
              <small>{label}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
