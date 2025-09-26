import { Button } from "@/components/ui/button";
import heroMockup from "@/assets/hero-mockup.jpg";
import { Calendar, CheckSquare, BarChart3, FileText, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary-light/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Sparkles className="w-5 h-5" />
                <span>Premium Productivity Suite</span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Meet{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Veer
                </span>
                <br />
                Scheduler
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Transform your productivity with the most elegant calendar, task manager, and note-taking solution. 
                Everything you need, beautifully designed.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2 bg-card-elevated px-4 py-2 rounded-full border shadow-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Smart Calendar</span>
              </div>
              <div className="flex items-center gap-2 bg-card-elevated px-4 py-2 rounded-full border shadow-sm">
                <CheckSquare className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Task Manager</span>
              </div>
              <div className="flex items-center gap-2 bg-card-elevated px-4 py-2 rounded-full border shadow-sm">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-2 bg-card-elevated px-4 py-2 rounded-full border shadow-sm">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Smart Notes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                variant="premium" 
                className="text-lg px-8 py-4 h-auto"
                onClick={() => window.location.href = '/dashboard'}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-gradient-hero rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-primary-light rounded-full border-2 border-background"></div>
                </div>
                <span>10,000+ users</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <span>⭐ 4.9/5 rating</span>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20 scale-110"></div>
              
              {/* Main image container */}
              <div className="relative bg-card rounded-3xl p-4 shadow-xl border">
                <img 
                  src={heroMockup} 
                  alt="Veer Scheduler Interface"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-card rounded-2xl p-4 shadow-lg border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">Task Completed</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-lg border animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Meeting in 30 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;