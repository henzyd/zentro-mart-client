import { ReactNode } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import Footer from "~/components/footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex justify-between gap-6 bg-white p-4 px-6">
        <Link href={"/"}>
          <Logo />
        </Link>
        <Button variant="ghost" className="w-[150px] gap-3 text-zinc-600/90">
          <FiSearch />
          Search
        </Button>
        <div className="flex items-center gap-6">
          <FaRegHeart className="text-lg" />
          <HiOutlineShoppingCart className="text-lg" />
        </div>
      </header>
      {children}
      <Footer />
    </main>
  );
}
