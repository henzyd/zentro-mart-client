"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsGrid } from "react-icons/bs";
import { IoIosList } from "react-icons/io";
import { cn } from "~/lib/utils";

interface Props {
  viewVal?: string;
}

const VIEW_OPTIONS = [
  { value: "grid", label: <BsGrid size={16} /> },
  { value: "list", label: <IoIosList size={20} /> },
];
const DEFAULT_VIEW = "grid";
const VIEW_PARAM_KEY = "view";

export default function ShopViewWidget({ viewVal = DEFAULT_VIEW }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateView = useCallback(
    (viewValue: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (viewValue === viewVal) return;

      if (viewValue === DEFAULT_VIEW) {
        params.delete(VIEW_PARAM_KEY);
      } else {
        params.set(VIEW_PARAM_KEY, viewValue);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [viewVal, pathname, router, searchParams],
  );

  return (
    <div className="flex w-fit items-center divide-x divide-zinc-300 rounded-md bg-white">
      {VIEW_OPTIONS.map(({ value, label }) => {
        const isSelected = viewVal === value;

        return (
          <button
            key={value}
            className={cn(
              "hover:text-primary flex items-center px-3 py-0.5 text-nowrap transition-colors",
              {
                "text-primary": isSelected,
              },
            )}
            onClick={() => updateView(value)}
            aria-label={`View - ${label}`}
          >
            <small>{label}</small>
          </button>
        );
      })}
    </div>
  );
}
