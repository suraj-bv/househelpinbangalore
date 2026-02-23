import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const POSTS_PER_PAGE = 12;

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  // Real-time query from Convex — auto-updates when data changes!
  const posts = useQuery(api.blogPosts.getAll);

  const totalPages = Math.ceil((posts?.length || 0) / POSTS_PER_PAGE);

  // Ensure current page is valid
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  // Paginated posts
  const paginatedPosts = useMemo(() => {
    if (!posts) return [];
    const startIndex = (safePage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  }, [posts, safePage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams(page === 1 ? {} : { page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      for (
        let i = Math.max(2, safePage - 1);
        i <= Math.min(totalPages - 1, safePage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cleaning Tips & Home Care Blog | House Help in Bangalore"
        description="Read expert cleaning tips, eco-friendly home care guides, and professional advice from House Help in Bangalore. Keep your home spotless with our blog."
        canonicalPath="/blogs"
        keywords="cleaning tips bangalore, home care blog, maid service tips, house cleaning guide, eco-friendly cleaning, home maintenance tips"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=60')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Blog
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Tips & insights for a spotless home
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Cleaning guides, eco-friendly tips, and expert advice from our team to help you keep every corner fresh.
          </p>
        </div>
      </section>

      {/* All posts */}
      <AnimatedSection className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {safePage > 1 ? `All articles — Page ${safePage}` : "All articles"}
          </h2>
          <span className="text-sm text-muted-foreground">
            {posts ? `${posts.length} article${posts.length !== 1 ? "s" : ""}` : "Loading..."}
          </span>
        </div>

        {/* Loading state */}
        {posts === undefined ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading blog posts...</span>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogCard
                  key={post._id}
                  id={post._id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  date={post.date}
                  content={post.content}
                  createdAt={post.createdAt}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Blog pagination">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className="h-10 w-10 rounded-full transition-all duration-200 disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) =>
                    typeof page === "string" ? (
                      <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-muted-foreground">
                        …
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={page === safePage ? "default" : "outline"}
                        size="icon"
                        onClick={() => goToPage(page)}
                        className={`h-10 w-10 rounded-full font-semibold transition-all duration-200 ${
                          page === safePage
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                            : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === safePage ? "page" : undefined}
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="h-10 w-10 rounded-full transition-all duration-200 disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            )}
          </>
        )}
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Blogs;
