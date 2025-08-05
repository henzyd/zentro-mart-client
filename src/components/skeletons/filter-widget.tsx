import { BiFilterAlt } from "react-icons/bi";
import { Skeleton } from "../ui/skeleton";

interface FilterSectionContainerProps {
  title: string;
  children: React.ReactNode;
}

const FilterSectionContainer = ({
  title,
  children,
}: FilterSectionContainerProps) => (
  <section className="flex flex-col gap-3 p-4">
    <h4 className="text-sm font-semibold">{title}</h4>
    <div className="flex flex-col gap-2">{children}</div>
  </section>
);

const FilterSectionSkeleton = ({
  title,
  itemCount = 5,
}: {
  title: string;
  itemCount?: number;
}) => (
  <FilterSectionContainer title={title}>
    {Array.from({ length: itemCount }).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-6 py-0.5"
      >
        <div className="flex items-center gap-3">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-3 w-6" />
      </div>
    ))}
    <Skeleton className="mt-1 h-4 w-24" />
  </FilterSectionContainer>
);

const StarRatingSkeleton = () => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="size-4 rounded-sm" />
    ))}
  </div>
);

const RatingSectionSkeleton = () => (
  <FilterSectionContainer title="Ratings">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-6 py-0.5"
      >
        <div className="flex items-center gap-3">
          <Skeleton className="size-4" />
          <StarRatingSkeleton />
        </div>
        <Skeleton className="h-3 w-6" />
      </div>
    ))}
  </FilterSectionContainer>
);

export default function FilterWidgetSkeleton() {
  return (
    <aside className="h-fit w-[250px] rounded-md bg-white">
      <section className="flex items-center gap-3 border-b border-zinc-100 p-4">
        <BiFilterAlt className="text-gray-400" />
        <p>Filters</p>
      </section>

      <FilterSectionSkeleton title="Category" itemCount={5} />

      <FilterSectionSkeleton title="Brands" itemCount={5} />

      <RatingSectionSkeleton />
    </aside>
  );
}
