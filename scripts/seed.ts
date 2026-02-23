/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Seed script to populate Convex database with initial blog posts.
 * Run: npx tsx scripts/seed.ts
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { blogPosts } from "../src/data/blogs.js";

const CONVEX_URL = process.env.VITE_CONVEX_URL || "https://content-kudu-855.eu-west-1.convex.cloud";

async function main() {
  console.log("🌱 Seeding Convex database...");
  console.log(`📡 Connecting to: ${CONVEX_URL}`);

  const client = new ConvexHttpClient(CONVEX_URL);

  // Prepare seed data (strip the local id field, Convex generates its own _id)
  const seedPosts = blogPosts.map(({ id, ...rest }) => rest);

  try {
    // Clear existing data first
    console.log("🧹 Clearing existing blog posts...");
    // @ts-ignore - removeAll might not be in generated types yet
    await client.mutation(api.blogPosts.removeAll, {});

    const result = await client.mutation(api.blogPosts.seed, {
      posts: seedPosts,
    });

    if (result.seeded) {
      console.log(`✅ Successfully seeded ${result.count} blog posts!`);
    } else {
      console.log(`ℹ️  ${result.message}`);
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
