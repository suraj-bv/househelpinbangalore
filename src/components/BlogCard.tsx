import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  content: string;
  createdAt: string;
  featured?: boolean;
}

const BlogCard = ({ slug, title, excerpt, image, date }: BlogCardProps) => (
  <Card className="glossy-card group overflow-hidden border-transparent shine-effect h-full flex flex-col">
    <div className="aspect-video overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
    <div className="p-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary/70">
        {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <h3 className="mb-2 text-xl font-bold text-foreground line-clamp-2 transition-colors group-hover:text-primary">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground line-clamp-4 leading-relaxed">{excerpt}</p>
      <Button variant="link" asChild className="h-auto p-0 font-bold text-primary">
        <Link to={`/blogs/${slug}`} className="inline-flex items-center">
          Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  </Card>
);

export default BlogCard;
