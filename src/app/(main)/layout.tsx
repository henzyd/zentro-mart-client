import { ReactNode } from "react";
import { FaRegHeart, FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex justify-between gap-6 bg-white p-4 px-6">
        <Logo />
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
      <footer className="flex items-center justify-between gap-8 bg-white p-4 px-6">
        <small>
          Made by{" "}
          <a
            href="https://github.com/henzyd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Henzyd
          </a>
        </small>
        <div className="flex items-center gap-4">
          <IoMail className="text-base" />
          <FaGithub />
          <FaLinkedin />
        </div>
      </footer>
    </main>
  );
}
