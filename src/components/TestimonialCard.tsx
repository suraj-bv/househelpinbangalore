import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/data/testimonials";

const TestimonialCard = ({ name, role, content, rating, avatar }: Testimonial) => (
  <Card className="glossy-card border-transparent">
    <CardContent className="p-6">
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent drop-shadow-sm" />
        ))}
      </div>
      <p className="mb-5 text-sm text-foreground/80 leading-relaxed italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-gradient-to-br from-primary/20 to-accent/20 text-primary ring-2 ring-primary/10">
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-sm font-bold">{avatar}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;
