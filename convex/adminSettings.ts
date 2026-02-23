import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_ADMIN_PASSWORD = "househelpblogs2026";

/**
 * Verify admin password
 */
export const verifyPassword = query({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("adminSettings")
      .withIndex("by_key", (q) => q.eq("key", "admin_password"))
      .first();

    const storedPassword = setting?.value || DEFAULT_ADMIN_PASSWORD;
    return args.password === storedPassword;
  },
});

/**
 * Change admin password
 */
export const changePassword = mutation({
  args: {
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("adminSettings")
      .withIndex("by_key", (q) => q.eq("key", "admin_password"))
      .first();

    const storedPassword = setting?.value || DEFAULT_ADMIN_PASSWORD;

    if (args.currentPassword !== storedPassword) {
      return { success: false, message: "Current password is incorrect" };
    }

    if (args.newPassword.length < 6) {
      return { success: false, message: "New password must be at least 6 characters" };
    }

    if (setting) {
      await ctx.db.patch(setting._id, { value: args.newPassword });
    } else {
      await ctx.db.insert("adminSettings", {
        key: "admin_password",
        value: args.newPassword,
      });
    }

    return { success: true, message: "Password changed successfully" };
  },
});
