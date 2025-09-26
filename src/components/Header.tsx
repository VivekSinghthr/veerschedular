import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Veer Scheduler
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              Pricing
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="font-medium">
              Sign In
            </Button>
            <Button variant="hero" className="font-semibold">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                onClick={toggleMenu}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                onClick={toggleMenu}
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                onClick={toggleMenu}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                onClick={toggleMenu}
              >
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="ghost" className="justify-start font-medium">
                  Sign In
                </Button>
                <Button variant="hero" className="justify-start font-semibold">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;