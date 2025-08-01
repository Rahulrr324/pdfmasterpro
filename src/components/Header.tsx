
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "All Tools", href: "#tools", section: "tools" },
    { name: "Convert", href: "#convert", section: "convert" },
    { name: "Edit", href: "#edit", section: "edit" },
    { name: "Organize", href: "#organize", section: "organize" },
    { name: "Security", href: "#security", section: "security" },
    { name: "AI Tools", href: "#ai", section: "ai" },
  ];

  const isActiveSection = (section: string) => {
    const hash = location.hash.replace('#', '');
    return hash === section;
  };

  const handleNavClick = (href: string, section: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${href}`);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg"
              role="img"
              aria-label="PdfMaster Pro Logo"
            >
              <span className="text-lg font-bold" aria-hidden="true">PM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                PdfMaster Pro
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Professional PDF Tools</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.section)}
                className={`text-sm font-medium transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-2 py-1 ${
                  isActiveSection(item.section) 
                    ? 'text-orange-600 font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActiveSection(item.section) ? "page" : undefined}
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href, item.section)}
                      className={`text-sm font-medium transition-colors text-left px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        isActiveSection(item.section)
                          ? 'text-orange-600 font-semibold bg-orange-50 dark:bg-orange-900/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                      aria-current={isActiveSection(item.section) ? "page" : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
