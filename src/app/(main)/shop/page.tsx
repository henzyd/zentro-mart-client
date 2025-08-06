import { Suspense } from "react";
import ShopFilterWidgetSkeleton from "~/components/skeletons/shop/filter-widget";
import { Skeleton } from "~/components/ui/skeleton";
import ShopFilterWidget from "~/components/widgets/shop/filter";
import ShopSearchWidget from "~/components/widgets/shop/search";
import ShopSortWiget from "~/components/widgets/shop/sort";
import ShopViewWidget from "~/components/widgets/shop/view";

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
  const { q, sort, view, categories, brands, ratings } = resolvedParams;

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
      <Suspense fallback={<ShopFilterWidgetSkeleton />}>
        <ShopFilterWidget initialFilters={initialFilters} />
      </Suspense>
      <div className="flex w-full flex-col gap-6">
        <header className="flex flex-col gap-x-4 gap-y-6">
          <div className="flex items-center justify-between gap-4">
            <Suspense
              fallback={
                <Skeleton className="h-8 w-full max-w-[300px] rounded-full" />
              }
            >
              <ShopSearchWidget searchVal={q} />
            </Suspense>
            <small className="text-end text-zinc-500">
              Showing 1–8 of 86 results
            </small>
          </div>
          <div className="flex justify-between gap-4">
            <Suspense
              fallback={
                <Skeleton className="h-8 w-full max-w-[500px] rounded-md" />
              }
            >
              <ShopSortWiget sortVal={sort} />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-8 w-20 rounded-md" />}>
              <ShopViewWidget viewVal={view} />
            </Suspense>
          </div>
        </header>
        <section></section>
      </div>
    </section>
  );
}
