import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <Card className="glossy-card group cursor-pointer border-transparent shine-effect">
    <CardContent className="flex flex-col items-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent group-hover:text-white">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export default ServiceCard;
