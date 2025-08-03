import { BiFilterAlt } from "react-icons/bi";

export default function FilterWidget() {
  return (
    <aside className="h-fit w-[250px] rounded-md bg-white">
      <section className="flex items-center gap-3 border-b border-zinc-100 p-4">
        <BiFilterAlt />
        <p>Filters</p>
      </section>
      <section>
        <h4>Category</h4>
        <div></div>
      </section>
    </aside>
  );
}
