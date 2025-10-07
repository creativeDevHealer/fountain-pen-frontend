import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Bot, 
  Search, 
  Bell, 
  TrendingUp, 
  Shield,
  Zap,
  Target
} from "lucide-react";

export const ComingSoonFeatures = () => {
  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Source Discovery",
      description: "Automatic discovery of regional auction houses, local marketplaces, and niche forums worldwide",
      progress: 25,
      status: "In Development"
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI-Powered Filtering",
      description: "Smart AI that learns from your preferences to filter authentic listings and reduce false positives",
      progress: 40,
      status: "Beta Testing"
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Advanced Search APIs",
      description: "Integration with Google Custom Search and Bing to uncover hidden marketplaces and new sources",
      progress: 15,
      status: "Planning"
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Smart Alerts System",
      description: "Instant notifications for new listings matching your criteria, with customizable alert preferences",
      progress: 60,
      status: "Coming Soon"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Market Analytics",
      description: "Price trends, market insights, and historical data analysis for better collecting decisions",
      progress: 10,
      status: "Roadmap"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Authentication Bypass",
      description: "Secure access to login-protected marketplaces like Facebook Marketplace and regional platforms",
      progress: 30,
      status: "Research"
    }
  ];

  return (
    <div className="mt-12 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Upcoming Features</h2>
        <p className="text-muted-foreground">
          Building the most comprehensive rare pen discovery system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-primary">
                {feature.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{feature.progress}%</span>
                  </div>
                  <Progress value={feature.progress} className="h-1" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};