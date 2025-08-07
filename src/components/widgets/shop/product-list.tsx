import ProductCard from "~/components/product-card";
import products from "~/lib/data/products.json";

export default function ShopProductListWidget() {
  return (
    <section className="not-smTablet:gap-4 not-smTablet:grid-cols-2 grid grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} data={product} />
      ))}
    </section>
  );
}
