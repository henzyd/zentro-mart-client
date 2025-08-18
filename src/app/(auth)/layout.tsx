import Link from "next/link";
import Logo from "~/components/logo";

export default function Layout({ children }: { children: string }) {
  return (
    <div className="bg-primary-50 flex min-h-screen w-full items-center justify-center p-4">
      <main className="largeMobile_545:px-4 flex w-full max-w-[500px] flex-col gap-8 rounded-2xl bg-white p-6 shadow-xs">
        <header className="flex justify-center gap-4 pt-2">
          <Link href="">
            <Logo />
          </Link>
        </header>
        {children}
      </main>
    </div>
  );
}
