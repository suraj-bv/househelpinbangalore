import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  keywords?: string;
  articlePublishedDate?: string;
}

const SITE_NAME = "House Help in Bangalore";
const BASE_URL = "https://househelpinbangalore.com";
const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80";

/**
 * SEOHead component — dynamically updates <head> meta tags for each page.
 * This ensures that Google sees the correct title, description, and social sharing info.
 */
const SEOHead = ({
  title,
  description,
  canonicalPath = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  keywords,
  articlePublishedDate,
}: SEOHeadProps) => {
  useEffect(() => {
    // Title
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Primary meta
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${BASE_URL}${canonicalPath}`);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", `${BASE_URL}${canonicalPath}`);

    // Article published date (for blog posts)
    if (articlePublishedDate) {
      setMeta("property", "article:published_time", articlePublishedDate);
    }

    // Cleanup - restore defaults when unmounting
    return () => {
      document.title = `${SITE_NAME} | Instant Maid Services | 1-2 Hour Slots`;
    };
  }, [title, description, canonicalPath, ogImage, ogType, noindex, keywords, articlePublishedDate]);

  return null; // This component doesn't render anything visible
};

export default SEOHead;
