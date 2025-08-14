import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Features } from "@/components/Features";
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
        <section id="convert">
          <ToolsGrid filter="convert" />
        </section>
        <section id="edit">
          <ToolsGrid filter="edit" />
        </section>
        <section id="organize">
          <ToolsGrid filter="organize" />
        </section>
        <section id="security">
          <ToolsGrid filter="security" />
        </section>
        <section id="ai">
          <ToolsGrid filter="ai" />
        </section>
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
