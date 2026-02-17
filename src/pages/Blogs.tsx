import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts, type BlogPost } from "@/data/blogs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 12;

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  // Sort blogs by createdAt descending (newest first)
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, []);

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  // Ensure current page is valid
  const safePage = Math.max(1, Math.min(currentPage, totalPages));

  // Paginated posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (safePage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return sortedPosts.slice(startIndex, endIndex);
  }, [sortedPosts, safePage]);

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
            {sortedPosts.length} article{sortedPosts.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post: BlogPost) => (
            <BlogCard key={post.id} {...post} />
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
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Blogs;
