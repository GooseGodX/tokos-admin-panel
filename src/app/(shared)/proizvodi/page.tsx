"use client";
import ProductCard from "@/components/shared/ProductCard";
import ProductSkeleton from "@/components/shared/ProductSkeleton";
import { useUserAndRole } from "@/lib/hooks/useUserAndRole";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";

export default function Proizvodi() {
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useFetchProducts();
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useUserAndRole();

  if (isLoadingProducts || isLoadingUser)
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Products</h2>
          <div className="grid grid-cols-3 gap-6 w-screen">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    );

  if (productsError) return <p>An error occurred: {productsError.message}</p>;
  if (userError) return <p>An error occurred: {userError.message}</p>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Products</h2>
        <div className="grid grid-cols-3 gap-6">
          {products &&
            user &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} user={user} />
            ))}
        </div>
      </section>
    </div>
  );
}
