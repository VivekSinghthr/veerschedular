import { Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card-elevated border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Veer Scheduler
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The most elegant productivity suite for modern professionals. 
              Transform your workflow today.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Features
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Pricing
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Integrations
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                API
              </a>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Blog
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Careers
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Contact
              </a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Help Center
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Documentation
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Community
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Status
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © 2024 Veer Scheduler. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;