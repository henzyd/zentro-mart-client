import FilterWidget from "~/components/widgets/shop/filter";

export default function Shop() {
  return (
    <section className="flex grow gap-6 p-4">
      <FilterWidget />
      <div className="flex flex-col gap-6">
        <header></header>
        <section></section>
      </div>
    </section>
  );
}
