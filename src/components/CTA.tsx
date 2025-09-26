import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTA = () => {
  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Cancel anytime",
    "Premium support included"
  ];

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-light/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to transform your
            <br />
            productivity?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized their workflow 
            with Veer Scheduler's premium productivity suite.
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-10 py-4 h-auto bg-white text-primary hover:bg-white/90 hover:shadow-xl font-semibold"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-4 h-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-white/70 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {/* Placeholder for company logos */}
              <div className="h-8 w-24 bg-white/20 rounded"></div>
              <div className="h-8 w-20 bg-white/20 rounded"></div>
              <div className="h-8 w-28 bg-white/20 rounded"></div>
              <div className="h-8 w-22 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;