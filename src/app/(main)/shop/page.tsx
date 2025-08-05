import { Suspense } from "react";
import FilterWidgetSkeleton from "~/components/skeletons/filter-widget";
import FilterWidget from "~/components/widgets/shop/filter";

interface ShopSearchParams {
  q?: string;
  categories?: string | string[];
  brands?: string | string[];
  ratings?: string | string[];
  sort?: string;
  view?: "grid" | "list";
  page?: string;
}

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const resolvedParams = await searchParams;
  const { categories, brands, ratings } = resolvedParams;
  // const { q, sort, view, page, categories, brands, ratings } = resolvedParams;

  const initialFilters = {
    categories:
      typeof categories === "string"
        ? categories.split(",").filter(Boolean)
        : Array.isArray(categories)
          ? categories
          : [],
    brands:
      typeof brands === "string"
        ? brands.split(",").filter(Boolean)
        : Array.isArray(brands)
          ? brands
          : [],
    ratings:
      typeof ratings === "string"
        ? ratings.split(",").map(Number).filter(Boolean)
        : Array.isArray(ratings)
          ? ratings.map(Number).filter(Boolean)
          : [],
  };

  // const shopParams: ShopSearchParams = {
  //   q: typeof q === "string" ? q : undefined,
  //   sort: typeof sort === "string" ? sort : "relevance",
  //   view:
  //     typeof view === "string" && (view === "grid" || view === "list")
  //       ? view
  //       : "grid",
  //   page: typeof page === "string" ? page : "1",
  //   ...initialFilters,
  // };

  return (
    <section className="max-w-shop mx-auto flex w-full grow gap-6 p-4">
      <Suspense fallback={<FilterWidgetSkeleton />}>
        <FilterWidget initialFilters={initialFilters} />
      </Suspense>
      <div className="flex flex-col gap-6">
        <header></header>
        <section></section>
      </div>
    </section>
  );
}
