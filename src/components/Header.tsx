
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

export const Header = () => {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Convert", href: "/category/convert" },
    { name: "Edit", href: "/category/edit" },
    { name: "Organize", href: "/category/organize" },
    { name: "Security", href: "/category/security" },
    { name: "AI Tools", href: "/category/ai" },
    { name: "Categories", href: "/categories" },
  ];

  const isActiveSection = (href: string) => {
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    navigate(href);
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
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-2 py-1 ${
                  isActiveSection(item.href) 
                    ? 'text-orange-600 font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActiveSection(item.href) ? "page" : undefined}
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
                      onClick={() => handleNavClick(item.href)}
                      className={`text-sm font-medium transition-colors text-left px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        isActiveSection(item.href)
                          ? 'text-orange-600 font-semibold bg-orange-50 dark:bg-orange-900/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                      aria-current={isActiveSection(item.href) ? "page" : undefined}
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
