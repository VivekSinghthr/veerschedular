import { Calendar, CheckSquare, BarChart3, FileText, Clock, Users, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const mainFeatures = [
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "Intelligent scheduling with AI-powered suggestions and seamless integration across all your devices.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: CheckSquare,
      title: "Task Manager",
      description: "Organize, prioritize, and track your tasks with advanced filtering and automated workflows.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Visual insights into your productivity patterns with detailed reports and goal tracking.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "Smart Notes",
      description: "Capture ideas instantly with rich formatting, tagging, and intelligent search capabilities.",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: "Smart Reminders",
      description: "Never miss important deadlines with context-aware notifications."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share calendars, assign tasks, and collaborate seamlessly."
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Automate repetitive tasks and streamline your workflow."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and privacy protection for your data."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need for
            <span className="bg-gradient-hero bg-clip-text text-transparent"> peak productivity</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Four powerful tools working together seamlessly to transform how you manage your time, 
            tasks, and ideas.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group p-8 hover:shadow-xl transition-all duration-500 border-0 bg-card-elevated hover:bg-card cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-6">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-subtle rounded-3xl p-12 animate-fade-in">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">
              Plus many more powerful features
            </h3>
            <p className="text-muted-foreground text-lg">
              Designed to scale with your needs and enhance your productivity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={feature.title} 
                className="text-center space-y-4 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;