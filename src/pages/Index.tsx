
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="tools">
          <ToolsGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
