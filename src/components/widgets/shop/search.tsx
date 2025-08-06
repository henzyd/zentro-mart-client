"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Formik } from "formik";
import { FiSearch } from "react-icons/fi";
import FormField from "~/components/forms/fields/form-field";

interface Props {
  searchVal?: string;
}

export default function ShopSearchWidget({ searchVal = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateURL = useCallback(
    (searchVal: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchVal.trim()) {
        params.set("q", searchVal.trim());
      } else {
        params.delete("q");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <Formik
      initialValues={{
        q: searchVal,
      }}
      onSubmit={({ q }) => {
        updateURL(q);
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormField
            name="q"
            placeholder="Search..."
            endAdornment={<FiSearch className="size-5 text-zinc-400" />}
            wrapperClassName="w-full max-w-[300px] rounded-full bg-white border-0"
            className="text-sm"
          />
        </form>
      )}
    </Formik>
  );
}
