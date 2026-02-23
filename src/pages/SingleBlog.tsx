import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ArrowLeft, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateFAQSchema } from "@/lib/blogStorage";

const SingleBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Real-time query from Convex
  const post = useQuery(api.blogPosts.getBySlug, slug ? { slug } : "skip");

  // Inject FAQ Schema JSON-LD
  useEffect(() => {
    if (post?.faqs && post.faqs.length > 0) {
      const schema = generateFAQSchema(post.faqs);
      const scriptId = "faq-schema-jsonld";

      // Remove existing script if any
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        const el = document.getElementById(scriptId);
        if (el) el.remove();
      };
    }
  }, [post]);

  // Update page title for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | House Help in Bangalore`;
    }
    return () => {
      document.title = "House Help in Bangalore";
    };
  }, [post]);

  // Loading state
  if (post === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
          <p className="mt-3 text-muted-foreground">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
          <Button asChild variant="link" className="mt-4">
            <Link to="/blogs"><ArrowLeft className="mr-1 h-4 w-4" /> Back to Blogs</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner */}
      <div className="aspect-[3/1] w-full overflow-hidden">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground">
          <Link to="/blogs"><ArrowLeft className="mr-1 h-4 w-4" /> Back to Blogs</Link>
        </Button>

        <p className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>

        <div className="prose prose-neutral mt-8 max-w-none text-muted-foreground">
          {post.content.split("\n\n").map((block: string, i: number) => {
            // Match heading levels 1-6
            const headingMatch = block.match(/^(#{1,6})\s+(.*)/);
            if (headingMatch) {
              const level = headingMatch[1].length;
              const text = headingMatch[2];
              if (level === 1) return <h1 key={i} className="mt-10 mb-4 text-3xl font-extrabold text-foreground">{text}</h1>;
              if (level === 2) return <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">{text}</h2>;
              if (level === 3) return <h3 key={i} className="mt-6 mb-2 text-lg font-bold text-foreground">{text}</h3>;
              if (level === 4) return <h4 key={i} className="mt-5 mb-2 text-base font-semibold text-foreground">{text}</h4>;
              if (level === 5) return <h5 key={i} className="mt-4 mb-1 text-sm font-semibold text-foreground">{text}</h5>;
              if (level === 6) return <h6 key={i} className="mt-4 mb-1 text-sm font-medium text-foreground/80 uppercase tracking-wider">{text}</h6>;
            }
            return <p key={i} className="mb-4 leading-relaxed">{block}</p>;
          })}
        </div>

        {/* FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 rounded-2xl border border-border/50 bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {post.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border/50 bg-background overflow-hidden transition-all"
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {faq.question}
                    </span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="border-t border-border/50 px-5 py-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
};

export default SingleBlog;
