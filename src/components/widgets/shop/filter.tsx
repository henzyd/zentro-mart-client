"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import categories from "~/lib/data/categories.json";
import brands from "~/lib/data/brands.json";
import { cn } from "~/lib/utils";
import { useDebounce } from "~/lib/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterState {
  categories: string[];
  brands: string[];
  ratings: number[];
}

interface RatingItem {
  stars: number;
  count: number;
}

interface StarRatingProps {
  rating: number;
}

interface ShowMoreButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

interface Props {
  initialFilters: FilterState;
}

const INITIAL_DISPLAY_COUNT = 5;
const DEBOUNCE_DELAY = 500;

const RATINGS: RatingItem[] = [
  { stars: 5, count: 156 },
  { stars: 4, count: 234 },
  { stars: 3, count: 189 },
  { stars: 2, count: 98 },
  { stars: 1, count: 45 },
];

function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
        <FaStar
          key={star}
          className={`${
            star <= rating
              ? "fill-orange-400 text-orange-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ShowMoreButton({ isExpanded, onToggle }: ShowMoreButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-primary mt-1 w-fit text-left text-xs font-medium hover:underline"
    >
      {isExpanded ? "Show less" : `Show more`}
    </button>
  );
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <section className="flex flex-col gap-3 p-4">
    <h4 className="text-sm font-semibold">{title}</h4>
    <div className="flex flex-col gap-2">{children}</div>
  </section>
);

export default function FilterWidget({ initialFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
  });

  const debouncedFilters = useDebounce(filters, DEBOUNCE_DELAY) as FilterState;

  const displayedCategories = useMemo(
    () =>
      showAllCategories
        ? categories
        : categories.slice(0, INITIAL_DISPLAY_COUNT),
    [showAllCategories],
  );

  const displayedBrands = useMemo(
    () => (showAllBrands ? brands : brands.slice(0, INITIAL_DISPLAY_COUNT)),
    [showAllBrands],
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const updateParam = (key: string, values: (string | number)[]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    };

    updateParam("categories", debouncedFilters.categories);
    updateParam("brands", debouncedFilters.brands);
    updateParam("ratings", debouncedFilters.ratings);

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [debouncedFilters, pathname, router, searchParams]);

  const createToggleHandler = useCallback(
    <T extends string | number>({
      filterKey,
      value,
      singleSelection = false,
    }: {
      filterKey: keyof FilterState;
      value: T;
      singleSelection?: boolean;
    }) => {
      setFilters((prev) => {
        const currentValues = prev[filterKey] as T[];
        const hasValue = currentValues.includes(value);

        if (singleSelection) {
          return {
            ...prev,
            [filterKey]: hasValue ? [] : [value],
          };
        }

        return {
          ...prev,
          [filterKey]: hasValue
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value],
        };
      });
    },
    [],
  );

  const handleCategorySelect = useCallback(
    (slug: string) => {
      createToggleHandler({
        filterKey: "categories",
        value: slug,
        singleSelection: true,
      });
    },
    [createToggleHandler],
  );

  const handleBrandToggle = useCallback(
    (slug: string) => {
      createToggleHandler({ filterKey: "brands", value: slug });
    },
    [createToggleHandler],
  );

  const handleRatingToggle = useCallback(
    (stars: number) => {
      createToggleHandler({ filterKey: "ratings", value: stars });
    },
    [createToggleHandler],
  );

  return (
    <aside className="h-fit w-[250px] rounded-md bg-white">
      <section className="flex items-center gap-3 border-b border-zinc-100 p-4">
        <BiFilterAlt />
        <p>Filters</p>
      </section>

      <FilterSection title="Category">
        <>
          {displayedCategories.map(({ id, name, slug, no_products }) => (
            <button
              key={id}
              onClick={() => handleCategorySelect(slug)}
              className={
                "group flex items-center justify-between gap-6 py-0.5 text-sm"
              }
            >
              <span
                className={cn("transition-colors group-hover:font-semibold", {
                  "font-semibold": filters.categories.includes(slug),
                })}
              >
                {name}
              </span>
              <span className="text-zinc-500">{no_products}</span>
            </button>
          ))}
          {categories.length > INITIAL_DISPLAY_COUNT ? (
            <ShowMoreButton
              isExpanded={showAllCategories}
              onToggle={() => setShowAllCategories(!showAllCategories)}
            />
          ) : null}
        </>
      </FilterSection>

      <FilterSection title="Brands">
        <>
          {displayedBrands.map(({ id, name, slug, no_products }) => (
            <div
              key={id}
              className="flex items-center justify-between gap-6 py-0.5 text-sm"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={name}
                  checked={filters.brands.includes(slug)}
                  onCheckedChange={() => handleBrandToggle(slug)}
                />
                <Label className="font-normal text-black" htmlFor={name}>
                  {name}
                </Label>
              </div>
              <span className="text-zinc-500">{no_products}</span>
            </div>
          ))}
          {brands.length > INITIAL_DISPLAY_COUNT ? (
            <ShowMoreButton
              isExpanded={showAllBrands}
              onToggle={() => setShowAllBrands(!showAllBrands)}
            />
          ) : null}
        </>
      </FilterSection>

      <FilterSection title="Ratings">
        <>
          {RATINGS.map(({ stars, count }, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-6 py-0.5 text-sm"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`rating-${stars}`}
                  checked={filters.ratings.includes(stars)}
                  onCheckedChange={() => handleRatingToggle(stars)}
                />
                <Label
                  className="flex items-center gap-2 font-normal text-black"
                  htmlFor={`rating-${stars}`}
                >
                  <StarRating rating={stars} />
                </Label>
              </div>
              <span className="text-zinc-500">{count}</span>
            </div>
          ))}
        </>
      </FilterSection>
    </aside>
  );
}
