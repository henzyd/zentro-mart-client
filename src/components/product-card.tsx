"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { useImageFallback } from "~/lib/hooks/use-image-fallback";
import { Product } from "~/types/global";
import { Button } from "./ui/button";
import RenderStars from "./render-stars";
import { formatPrice } from "~/lib/utils";
import { PRODUCT_IMAGE_FALLBACK } from "~/lib/constants";

interface Props {
  data: Product;
}

export default function ProductCard({
  data: {
    title,
    slug,
    thumbnail,
    price: { amount, currency_code },
    rating: { average },
  },
}: Props) {
  const { src, onError, hasError } = useImageFallback(
    thumbnail,
    PRODUCT_IMAGE_FALLBACK,
  );

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow">
      <button className="absolute top-5 right-5 z-10 rounded-full p-2 shadow-sm">
        <FaRegHeart className="text-red-500" />
      </button>
      <figure className="aspect-square w-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          width={400}
          height={300}
          onError={onError}
          className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${
            hasError ? "opacity-75" : ""
          }`}
        />
      </figure>
      <div className="flex flex-col justify-between gap-6 p-4">
        <div className="flex flex-col gap-1">
          <Link href={"/shop/" + slug} className="hover:underline">
            <h3 className="line-clamp-2 font-medium text-gray-900">{title}</h3>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <RenderStars rating={average} size={12} />
            </div>
            <span className="text-sm font-medium text-gray-600">{average}</span>
          </div>
          <h2 className="text-primary mt-0.5 font-semibold">
            {formatPrice(amount, currency_code)}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button size={"sm"} variant={"outline"}>
            <IoBagHandleOutline />
            <span>Add To Cart</span>
          </Button>
          <Button size={"sm"}>Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
