import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceDetailProps {
  title: string;
  items: string[];
  notIncluded?: string[];
}

const ServiceDetail = ({ title, items, notIncluded }: ServiceDetailProps) => (
  <Card className="glossy-card border-transparent h-full">
    <CardContent className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      
      {/* Included Items */}
      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/80">{item}</span>
          </div>
        ))}
      </div>
      
      {/* Not Included Items */}
      {notIncluded && notIncluded.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          {notIncluded.map((item, index) => (
            <div key={index} className="flex items-start gap-2 mb-2">
              <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

export default ServiceDetail;
