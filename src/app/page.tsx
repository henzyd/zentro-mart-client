import Image from "next/image";
import Link from "next/link";
import Footer from "~/components/footer";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import LandingIntroBg from "~/assets/images/landing-intro-bg.jpeg";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-between gap-6 bg-white p-4 px-6">
        <Link href={"/"}>
          <Logo />
        </Link>
        <Button asChild>
          <Link href={"/shop"}>Show Now</Link>
        </Button>
      </header>
      <main className="w-full max-w-6xl grow self-center px-6 py-10">
        <div className="not-mdTablet:grid-cols-1 grid grid-cols-2 gap-8">
          <section className="not-mdTablet:order-2 flex max-w-xl flex-col justify-center gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                Discover Stunning Images
              </h1>
              <p className="text-base text-gray-600">
                Welcome to our image marketplace, where creativity meets
                quality. Browse and purchase high-resolution images perfect for
                your projects, from personal use to professional campaigns.
                <br /> Handpicked collections updated regularly to keep your
                ideas fresh.
              </p>
            </div>
            <Button asChild className="w-fit" size={"sm"}>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </section>
          <section className="not-mdTablet:order-1 not-mdTablet:place-content-start grid place-content-center">
            <Image
              src={LandingIntroBg}
              alt="Shopping"
              className="w-full max-w-xl rounded-lg shadow"
              priority
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
