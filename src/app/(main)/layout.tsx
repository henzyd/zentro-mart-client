import { ReactNode } from "react";
import { FaRegHeart, FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-App flex min-h-screen flex-col">
      <header className="flex justify-between gap-6 bg-white p-4 px-6">
        <Logo />
        <Button variant="ghost" className="w-[150px] gap-3">
          <CiSearch />
          <span className="text-zinc-600/90">Search</span>
        </Button>
        <div className="flex items-center gap-4">
          <FaRegHeart className="text-lg" />
          <HiOutlineShoppingCart className="text-lg" />
        </div>
      </header>
      {children}
      <footer className="flex items-center justify-between gap-8 bg-white p-4 px-6">
        <p>
          Made by{" "}
          <a
            href="https://github.com/henzyd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Henzyd
          </a>
        </p>
        <div className="flex items-center gap-4">
          <IoMail className="text-base" />
          <FaGithub />
          <FaLinkedin />
        </div>
      </footer>
    </main>
  );
}
