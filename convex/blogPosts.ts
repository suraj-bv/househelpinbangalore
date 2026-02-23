import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ==================== QUERIES ====================

/**
 * Get all blog posts, sorted by createdAt descending (newest first)
 */
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("blogPosts").collect();
    // Resolve storage URLs
    const postsWithUrls = await Promise.all(
      posts.map(async (post) => {
        if (post.storageId) {
          const url = await ctx.storage.getUrl(post.storageId);
          if (url) return { ...post, image: url };
        }
        return post;
      })
    );
    // Sort by createdAt descending
    return postsWithUrls.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
});

/**
 * Generate a short-lived upload URL for the client
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Get a single blog post by slug
 */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (post && post.storageId) {
      const url = await ctx.storage.getUrl(post.storageId);
      if (url) return { ...post, image: url };
    }
    
    return post;
  },
});

/**
 * Get featured blog posts
 */
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
      
    const postsWithUrls = await Promise.all(
      posts.map(async (post) => {
        if (post.storageId) {
          const url = await ctx.storage.getUrl(post.storageId);
          if (url) return { ...post, image: url };
        }
        return post;
      })
    );

    return postsWithUrls.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
});

/**
 * Check if a slug is unique (optionally exclude a specific post ID)
 */
export const isSlugUnique = query({
  args: {
    slug: v.string(),
    excludeId: v.optional(v.id("blogPosts")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!existing) return true;
    if (args.excludeId && existing._id === args.excludeId) return true;
    return false;
  },
});

/**
 * Get blog post count stats
 */
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("blogPosts").collect();
    const now = new Date();
    return {
      total: posts.length,
      featured: posts.filter((p) => p.featured).length,
      withFaqs: posts.filter((p) => p.faqs && p.faqs.length > 0).length,
      thisMonth: posts.filter((p) => {
        const d = new Date(p.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length,
    };
  },
});

// ==================== MUTATIONS ====================

/**
 * Add a new blog post
 */
export const add = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    image: v.string(),
    storageId: v.optional(v.id("_storage")),
    date: v.string(),
    createdAt: v.string(),
    featured: v.optional(v.boolean()),
    faqs: v.optional(
      v.array(
        v.object({
          question: v.string(),
          answer: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("blogPosts", args);
    return id;
  },
});

/**
 * Update an existing blog post
 */
export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    image: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    date: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    faqs: v.optional(
      v.array(
        v.object({
          question: v.string(),
          answer: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

/**
 * Delete a blog post
 */
export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/**
 * Seed the database with initial blog posts (only if empty)
 */
export const seed = mutation({
  args: {
    posts: v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        excerpt: v.string(),
        content: v.string(),
        image: v.string(),
        storageId: v.optional(v.id("_storage")),
        date: v.string(),
        createdAt: v.string(),
        featured: v.optional(v.boolean()),
        faqs: v.optional(
          v.array(
            v.object({
              question: v.string(),
              answer: v.string(),
            })
          )
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check if database already has posts
    const existing = await ctx.db.query("blogPosts").first();
    if (existing) {
      return { seeded: false, count: 0, message: "Database already has posts" };
    }

    // Insert all seed posts
    for (const post of args.posts) {
      await ctx.db.insert("blogPosts", post);
    }

    return { seeded: true, count: args.posts.length, message: "Database seeded successfully" };
  },
});

/**
 * Remove ALL blog posts (for reseeding)
 */
export const removeAll = mutation({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("blogPosts").collect();
    for (const post of posts) {
      await ctx.db.delete(post._id);
    }
    return posts.length;
  },
});

/**
 * Fix content: remove author, update Bengaluru -> Bangalore
 */
export const fixContent = mutation({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("blogPosts").collect();
    let count = 0;
    for (const post of posts) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { _id, _creationTime, ...rest } = post as any;
      
      if (rest.author) delete rest.author;
      
      if (rest.title) rest.title = rest.title.replace(/Bengaluru/g, "Bangalore");
      if (rest.excerpt) rest.excerpt = rest.excerpt.replace(/Bengaluru/g, "Bangalore");
      if (rest.content) rest.content = rest.content.replace(/Bengaluru/g, "Bangalore");
      
      await ctx.db.replace(_id, rest);
      count++;
    }
    return count;
  },
});

