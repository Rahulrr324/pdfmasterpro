
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, User, LogIn } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { TopToolsMenu } from "@/components/TopToolsMenu";
import { AllToolsDropdown } from "@/components/AllToolsDropdown";

export const Header = () => {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAuthClick = () => {
    navigate('/auth');
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
          <div className="hidden md:flex items-center space-x-6">
            <TopToolsMenu />
            <AllToolsDropdown />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Auth Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAuthClick}
              className="hidden sm:flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex hover:bg-purple-50"
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
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <Button
                    onClick={handleAuthClick}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login / Signup
                  </Button>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Quick Tools</h3>
                    <div className="space-y-2">
                      {["Merge PDF", "Compress PDF", "PDF to Word", "Split PDF"].map((tool) => (
                        <Button
                          key={tool}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            setIsOpen(false);
                            navigate(`/tool/${tool.toLowerCase().replace(' ', '-')}`);
                          }}
                        >
                          {tool}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full justify-start"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
