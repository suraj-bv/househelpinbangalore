import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts, type BlogPost } from "@/data/blogs";

const SingleBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p: BlogPost) => p.slug === slug);

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
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.author}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>

        <div className="prose prose-neutral mt-8 max-w-none text-muted-foreground">
          {post.content.split("\n\n").map((block: string, i: number) => {
            if (block.startsWith("## ")) {
              return <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">{block.replace("## ", "")}</h2>;
            }
            return <p key={i} className="mb-4 leading-relaxed">{block}</p>;
          })}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default SingleBlog;
