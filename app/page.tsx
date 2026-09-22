import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";

export default function HomePage() {
  return (
    <main id="main" className="relative min-h-screen flex flex-col">
      <Nav />
      <Footer />
    </main>
  );
}
