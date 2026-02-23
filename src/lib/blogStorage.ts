/**
 * Blog utility functions (non-hook helpers).
 * All data now comes from Convex - these are utility functions only.
 */

export interface BlogFAQ {
  question: string;
  answer: string;
}

/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Generate FAQ Schema JSON-LD for a blog post
 */
export function generateFAQSchema(faqs: BlogFAQ[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
