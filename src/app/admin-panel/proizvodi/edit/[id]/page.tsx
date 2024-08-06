import { getProductById } from "@/lib/actions/productActions";
import EditProductForm from "./form";

export default async function ProductEditSlug({
  params,
}: {
  params: { id: number };
}) {
  // NOTE:
  // fetch
  // display data
  // form
  // preview changed data
  // submit the new data

  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center m-4">
        <h1 className="text-3xl font-bold text-lightMode-text dark:text-darkMode-text mb-6">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <EditProductForm product={product} />
    </div>
  );
}
