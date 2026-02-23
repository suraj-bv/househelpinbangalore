
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Script to completely reset the blog database with fresh seed data.
 * Run: npx tsx scripts/reset-db.ts
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { blogPosts } from "../src/data/blogs.js";

// Use environment variable or fallback to hardcoded URL
const CONVEX_URL = process.env.VITE_CONVEX_URL || "https://content-kudu-855.eu-west-1.convex.cloud";

async function main() {
  console.log(`📡 Connecting to: ${CONVEX_URL}`);
  const client = new ConvexHttpClient(CONVEX_URL);

  try {
    console.log("🧹 Clearing existing blog posts...");
    // @ts-ignore - function might not be in types yet if codegen hasn't run
    await client.mutation(api.blogPosts.removeAll, {});
    
    console.log("🌱 Seeding fresh data from src/data/blogs.ts...");
    // Remove local 'id' field as Convex generates '_id'
    const seedPosts = blogPosts.map(({ id, ...rest }) => rest);
    
    const result = await client.mutation(api.blogPosts.seed, {
      posts: seedPosts,
    });

    if (result.seeded) {
      console.log(`✅ Successfully seeded ${result.count} blog posts!`);
      console.log("NOTE: All 'Bengaluru' references have been replaced with 'Bangalore' and 'author' field removed.");
    } else {
      console.log(`ℹ️  ${result.message}`);
    }
  } catch (error) {
    console.error("❌ Reset failed:", error);
    process.exit(1);
  }
}

main();
