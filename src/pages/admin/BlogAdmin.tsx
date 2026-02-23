import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { generateSlug, type BlogFAQ } from "@/lib/blogStorage";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  LogOut,
  Search,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  GripVertical,
  FileText,
  Settings,
  RotateCcw,
  ImageIcon,
  HelpCircle,
  AlertTriangle,
  Check,
  BookOpen,
  Upload,
} from "lucide-react";

type ViewMode = "list" | "create" | "edit" | "settings";

const BlogAdmin = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingPostId, setEditingPostId] = useState<Id<"blogPosts"> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Id<"blogPosts"> | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImage, setFormImage] = useState("");
  const [initialImage, setInitialImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url");
  const [existingStorageId, setExistingStorageId] = useState<Id<"_storage"> | undefined>(undefined);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formFaqs, setFormFaqs] = useState<BlogFAQ[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [autoSlug, setAutoSlug] = useState(true);

  // Convex queries and mutations
  const posts = useQuery(api.blogPosts.getAll) || [];
  const slugCheck = useQuery(
    api.blogPosts.isSlugUnique,
    formSlug ? { slug: formSlug, excludeId: editingPostId ?? undefined } : "skip"
  );
  const addPost = useMutation(api.blogPosts.add);
  const updatePost = useMutation(api.blogPosts.update);
  const removePost = useMutation(api.blogPosts.remove);
  const generateUploadUrl = useMutation(api.blogPosts.generateUploadUrl);
  const changePassword = useMutation(api.adminSettings.changePassword);

  // Check auth
  useEffect(() => {
    if (sessionStorage.getItem("hhb_admin_auth") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && formTitle) {
      setFormSlug(generateSlug(formTitle));
    }
  }, [formTitle, autoSlug]);

  // Success message auto-dismiss
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormTitle("");
    setFormSlug("");
    setFormExcerpt("");
    setFormContent("");
    setFormImage("");
    setInitialImage("");
    setSelectedFile(null);
    setImageInputType("url");
    setExistingStorageId(undefined);
    setFormFeatured(false);
    setFormFaqs([]);
    setFormErrors({});
    setAutoSlug(true);
    setEditingPostId(null);
  };

  const populateForm = (post: typeof posts[number]) => {
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormImage(post.image);
    setInitialImage(post.image);
    // @ts-ignore - storageId might not be in the type if codegen hasn't run fully or query shape
    setExistingStorageId(post.storageId);
    setSelectedFile(null);
    setImageInputType("url"); // Default to showing the current URL
    setFormFeatured(post.featured || false);
    setFormFaqs(post.faqs || []);
    setFormErrors({});
    setAutoSlug(false);
    setEditingPostId(post._id);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formTitle.trim()) errors.title = "Title is required";
    if (!formSlug.trim()) errors.slug = "Slug is required";
    else if (slugCheck === false)
      errors.slug = "This slug is already in use";
    if (!formExcerpt.trim()) errors.excerpt = "Excerpt is required";
    if (!formContent.trim()) errors.content = "Content is required";
    if (!formImage.trim()) errors.image = "Image URL is required";

    // Validate FAQs
    formFaqs.forEach((faq, i) => {
      if (!faq.question.trim())
        errors[`faq_q_${i}`] = `FAQ ${i + 1} question is required`;
      if (!faq.answer.trim())
        errors[`faq_a_${i}`] = `FAQ ${i + 1} answer is required`;
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      let finalStorageId = existingStorageId;
      let finalImage = formImage;

      // Handle File Upload
      if (imageInputType === "upload" && selectedFile) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });
        const { storageId } = await result.json();
        finalStorageId = storageId;
        finalImage = "uploaded-image"; // Placeholder, query resolves actual URL
      } else if (imageInputType === "url") {
        // If user kept the initial image (which was resolved from storage), keep the storageId.
        // If they changed the text, assume they want the new external URL, so clear storageId.
        if (formImage === initialImage && existingStorageId) {
          finalStorageId = existingStorageId;
        } else {
          finalStorageId = undefined;
        }
      }

      const now = new Date().toISOString();
      const editingPost = editingPostId ? posts.find((p) => p._id === editingPostId) : null;
      const postData = {
        slug: formSlug.trim(),
        title: formTitle.trim(),
        excerpt: formExcerpt.trim(),
        content: formContent.trim(),
        image: finalImage.trim(),
        storageId: finalStorageId,
        date: now.split("T")[0],
        createdAt: editingPost?.createdAt || now,
        featured: formFeatured,
        faqs: formFaqs.length > 0 ? formFaqs : undefined,
      };

      if (editingPostId) {
        await updatePost({ id: editingPostId, ...postData });
        setSuccessMessage("Blog post updated successfully!");
      } else {
        await addPost(postData);
        setSuccessMessage("Blog post created successfully!");
      }

      resetForm();
      setViewMode("list");
    } catch (err) {
      console.error("Failed to save post:", err);
      setFormErrors({ general: "Failed to save. Please try again." });
    }
  };

  const handleDelete = async (id: Id<"blogPosts">) => {
    try {
      await removePost({ id });
      setShowDeleteConfirm(null);
      setSuccessMessage("Blog post deleted successfully!");
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hhb_admin_auth");
    navigate("/admin");
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setFormErrors({ password: "New password must be at least 6 characters" });
      return;
    }
    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });
      if (result.success) {
        setCurrentPassword("");
        setNewPassword("");
        setFormErrors({});
        setSuccessMessage("Password changed successfully!");
      } else {
        setFormErrors({ password: result.message });
      }
    } catch (err) {
      console.error("Failed to change password:", err);
      setFormErrors({ password: "Failed to change password" });
    }
  };

  const handleReset = () => {
    // Reset is no longer available with Convex
    setShowResetConfirm(false);
    setSuccessMessage("Reset is not available with cloud database.");
  };

  const addFaq = () => {
    setFormFaqs([...formFaqs, { question: "", answer: "" }]);
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...formFaqs];
    updated[index] = { ...updated[index], [field]: value };
    setFormFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFormFaqs(formFaqs.filter((_, i) => i !== index));
  };

  const moveFaq = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formFaqs.length) return;
    const updated = [...formFaqs];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFormFaqs(updated);
  };

  // Insert markdown helpers
  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = formContent.substring(start, end);
    const replacement = prefix + (selected || "text") + suffix;
    const newContent = formContent.substring(0, start) + replacement + formContent.substring(end);
    setFormContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || "text").length);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/90 backdrop-blur-sm px-5 py-3 text-white shadow-lg shadow-emerald-500/25">
            <Check className="h-5 w-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-slate-800 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Blog Post</h3>
            </div>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-slate-800 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                <RotateCcw className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Reset Blog Data</h3>
            </div>
            <p className="text-slate-400 mb-6">
              This will replace all blog posts with the original seed data. Any posts you've added or
              edited will be lost. Are you sure?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Blog Manager</h1>
              <p className="text-xs text-slate-500">House Help in Bangalore</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open("/blogs", "_blank")}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View Site</span>
            </button>
            <button
              onClick={() => {
                if (viewMode === "settings") {
                  setViewMode("list");
                } else {
                  setViewMode("settings");
                  resetForm();
                }
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                viewMode === "settings"
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* ========== SETTINGS VIEW ========== */}
        {viewMode === "settings" && (
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setViewMode("list")}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold text-white">Settings</h2>
            </div>

            {/* Change Password */}
            <div className="rounded-xl border border-white/10 bg-slate-800/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-400">{formErrors.password}</p>
                )}
                <button
                  onClick={handlePasswordChange}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Reset Data */}
            <div className="rounded-xl border border-red-500/20 bg-slate-800/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Danger Zone</h3>
              <p className="text-sm text-slate-400 mb-4">
                Reset all blog data to the original seed content. This will delete all changes,
                new posts, and edits you've made.
              </p>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <RotateCcw className="inline h-4 w-4 mr-2" />
                Reset to Original Data
              </button>
            </div>
          </div>
        )}

        {/* ========== LIST VIEW ========== */}
        {viewMode === "list" && (
          <>
            {/* Stats bar */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Total Posts",
                  value: posts.length,
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  label: "Featured",
                  value: posts.filter((p) => p.featured).length,
                  color: "from-amber-500 to-orange-600",
                },
                {
                  label: "With FAQs",
                  value: posts.filter((p) => p.faqs && p.faqs.length > 0).length,
                  color: "from-violet-500 to-purple-600",
                },
                {
                  label: "This Month",
                  value: posts.filter((p) => {
                    const d = new Date(p.createdAt);
                    const now = new Date();
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                  }).length,
                  color: "from-sky-500 to-blue-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/5 bg-slate-800/50 p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                  <p
                    className={`mt-1 text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Search + Create */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by title or slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setViewMode("create");
                }}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                New Blog Post
              </button>
            </div>

            {/* Posts list */}
            <div className="space-y-3">
              {filteredPosts.length === 0 ? (
                <div className="rounded-xl border border-white/5 bg-slate-800/30 py-20 text-center">
                  <FileText className="mx-auto h-12 w-12 text-slate-600 mb-4" />
                  <p className="text-slate-500">
                    {searchQuery ? "No matching posts found" : "No blog posts yet"}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => {
                        resetForm();
                        setViewMode("create");
                      }}
                      className="mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Create your first post →
                    </button>
                  )}
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="group flex items-start gap-4 rounded-xl border border-white/5 bg-slate-800/30 p-4 hover:border-white/10 hover:bg-slate-800/50 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="hidden sm:block h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-700">
                      <img
                        src={post.image}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='80' fill='%23334155'%3E%3Crect width='128' height='80' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2364748b' font-size='12'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Featured
                          </span>
                        )}
                        {post.faqs && post.faqs.length > 0 && (
                          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                            {post.faqs.length} FAQ{post.faqs.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mb-1">
                        /{post.slug} ·{" "}
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => window.open(`/blogs/${post.slug}`, "_blank")}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          populateForm(post);
                          setViewMode("edit");
                        }}
                        className="rounded-lg p-2 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(post._id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ========== CREATE / EDIT VIEW ========== */}
        {(viewMode === "create" || viewMode === "edit") && (
          <div className="mx-auto max-w-4xl">
            {/* Editor Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    setViewMode("list");
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold text-white">
                  {viewMode === "create" ? "Create New Post" : "Edit Post"}
                </h2>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="h-4 w-4" />
                  {viewMode === "create" ? "Publish" : "Update"}
                </button>
                {formErrors.general && (
                  <p className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                    {formErrors.general}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Main Content */}
              <div className="space-y-6">
                {/* Title */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter a compelling blog title..."
                    className={`w-full rounded-lg border ${
                      formErrors.title ? "border-red-500/50" : "border-white/10"
                    } bg-slate-700/50 px-4 py-3 text-lg font-semibold text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-xs text-red-400">{formErrors.title}</p>
                  )}
                </div>

                {/* Slug */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">URL Slug *</label>
                    <label className="flex items-center gap-2 text-xs text-slate-500">
                      <input
                        type="checkbox"
                        checked={autoSlug}
                        onChange={(e) => setAutoSlug(e.target.checked)}
                        className="rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500/20"
                      />
                      Auto-generate
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">/blogs/</span>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => {
                        setAutoSlug(false);
                        setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                      }}
                      placeholder="url-slug"
                      className={`flex-1 rounded-lg border ${
                        formErrors.slug ? "border-red-500/50" : "border-white/10"
                      } bg-slate-700/50 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20`}
                    />
                  </div>
                  {formErrors.slug && (
                    <p className="mt-1 text-xs text-red-400">{formErrors.slug}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Excerpt / Summary *
                  </label>
                  <textarea
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="A brief summary of the blog post (appears in cards and meta description)..."
                    rows={3}
                    className={`w-full rounded-lg border ${
                      formErrors.excerpt ? "border-red-500/50" : "border-white/10"
                    } bg-slate-700/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none`}
                  />
                  <div className="mt-1 flex justify-between">
                    {formErrors.excerpt && (
                      <p className="text-xs text-red-400">{formErrors.excerpt}</p>
                    )}
                    <p className="text-xs text-slate-600 ml-auto">
                      {formExcerpt.length}/160 chars recommended
                    </p>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Blog Content *
                  </label>
                  {/* Toolbar */}
                  <div className="mb-2 flex flex-wrap items-center gap-1 rounded-lg border border-white/5 bg-slate-900/50 p-1.5">
                    {[1, 2, 3, 4, 5, 6].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => insertMarkdown(`${"#".repeat(level)} `, "")}
                        className="rounded px-2 py-1 text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                        title={`Heading ${level}`}
                      >
                        H{level}
                      </button>
                    ))}
                    <div className="h-4 w-px bg-slate-700 mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown("**", "**")}
                      className="rounded px-2.5 py-1 text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("*", "*")}
                      className="rounded px-2.5 py-1 text-xs italic text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                      title="Italic"
                    >
                      I
                    </button>
                    <div className="h-4 w-px bg-slate-700 mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown("\n- ", "")}
                      className="rounded px-2.5 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                      title="Bullet List"
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("\n1. ", "")}
                      className="rounded px-2.5 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                      title="Numbered List"
                    >
                      1. List
                    </button>
                  </div>
                  <textarea
                    id="content-editor"
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder={`Write your blog content here using simple formatting:\n\n# Use # for H1 heading\n## Use ## for H2 heading\n### Use ### for H3 heading\n\nWrite paragraphs with blank lines between them.\n\n## Another Section\n\nMore content here...`}
                    rows={18}
                    className={`w-full rounded-lg border ${
                      formErrors.content ? "border-red-500/50" : "border-white/10"
                    } bg-slate-700/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-y font-mono leading-relaxed`}
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-xs text-red-400">{formErrors.content}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-600">
                    Use # for H1, ## for H2, ### for H3, up to ###### for H6. Separate paragraphs with empty lines.
                  </p>
                </div>

                {/* FAQs Section */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-violet-400" />
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          FAQ Schema
                        </h3>
                        <p className="text-xs text-slate-500">
                          Add frequently asked questions for rich search results
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400 hover:bg-violet-500/20 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add FAQ
                    </button>
                  </div>

                  {formFaqs.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-white/10 py-8 text-center">
                      <HelpCircle className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                      <p className="text-sm text-slate-500">No FAQs added yet</p>
                      <p className="text-xs text-slate-600 mt-1">
                        Add FAQs to enable rich search snippets in Google
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formFaqs.map((faq, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-white/5 bg-slate-900/30 p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                FAQ {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => moveFaq(index, "up")}
                                disabled={index === 0}
                                className="rounded p-1 text-slate-500 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30"
                              >
                                <ChevronUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveFaq(index, "down")}
                                disabled={index === formFaqs.length - 1}
                                className="rounded p-1 text-slate-500 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30"
                              >
                                <ChevronDown className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="rounded p-1 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-400 mb-1">
                                Question
                              </label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) =>
                                  updateFaq(index, "question", e.target.value)
                                }
                                placeholder="What is the question?"
                                className={`w-full rounded-lg border ${
                                  formErrors[`faq_q_${index}`]
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                } bg-slate-700/50 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20`}
                              />
                              {formErrors[`faq_q_${index}`] && (
                                <p className="mt-1 text-xs text-red-400">
                                  {formErrors[`faq_q_${index}`]}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-400 mb-1">
                                Answer
                              </label>
                              <textarea
                                value={faq.answer}
                                onChange={(e) =>
                                  updateFaq(index, "answer", e.target.value)
                                }
                                placeholder="Provide a detailed answer..."
                                rows={3}
                                className={`w-full rounded-lg border ${
                                  formErrors[`faq_a_${index}`]
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                } bg-slate-700/50 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 resize-none`}
                              />
                              {formErrors[`faq_a_${index}`] && (
                                <p className="mt-1 text-xs text-red-400">
                                  {formErrors[`faq_a_${index}`]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
                {/* Featured Image */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <ImageIcon className="h-4 w-4" />
                      Featured Image *
                    </label>
                    <div className="flex bg-slate-700/50 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setImageInputType("url")}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                          imageInputType === "url" 
                            ? "bg-slate-600 text-white shadow-sm" 
                            : "text-slate-400 hover:text-slate-300"
                        }`}
                      >
                        URL
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputType("upload")}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                          imageInputType === "upload" 
                            ? "bg-emerald-600 text-white shadow-sm" 
                            : "text-slate-400 hover:text-slate-300"
                        }`}
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  {/* Image preview */}
                  {(formImage || selectedFile) && (
                    <div className="mb-3 overflow-hidden rounded-lg bg-slate-700 aspect-video relative group">
                      <img
                        src={formImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {existingStorageId && (
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                          Storage
                        </div>
                      )}
                    </div>
                  )}

                  {imageInputType === "url" ? (
                    <div>
                      <input
                        type="url"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className={`w-full rounded-lg border ${
                          formErrors.image ? "border-red-500/50" : "border-white/10"
                        } bg-slate-700/50 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20`}
                      />
                      <p className="mt-2 text-xs text-slate-600">
                        Paste an image URL from Unsplash or any image host
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className={`relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-colors ${
                        selectedFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30'
                      }`}>
                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className={`w-8 h-8 mb-3 ${selectedFile ? 'text-emerald-500' : 'text-slate-400'}`} />
                            <p className="mb-2 text-sm text-slate-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setSelectedFile(file);
                              setFormImage(URL.createObjectURL(file));
                              setExistingStorageId(undefined); // Clear existing storage ID if new file selected
                            }
                          }}
                        />
                      </div>
                      {selectedFile && (
                        <p className="mt-2 text-xs text-emerald-400 text-center truncate px-2">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                  )}

                  {formErrors.image && (
                    <p className="mt-1 text-xs text-red-400">{formErrors.image}</p>
                  )}
                </div>

                {/* Featured toggle */}
                <div className="rounded-xl border border-white/10 bg-slate-800/50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">Featured Post</span>
                    <button
                      type="button"
                      onClick={() => setFormFeatured(!formFeatured)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        formFeatured ? "bg-emerald-500" : "bg-slate-700"
                      }`}
                      aria-pressed={formFeatured}
                      aria-label="Toggle featured post"
                    >
                      <div
                        className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          formFeatured ? "translate-x-[22px]" : "translate-x-[2px]"
                        } mt-[2px]`}
                      />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Featured posts get highlighted on the homepage
                  </p>
                </div>

                {/* Tips */}
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                    ✍️ Writing Tips
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li>• Use <code className="text-emerald-400">#</code> for H1, <code className="text-emerald-400">##</code> for H2, up to <code className="text-emerald-400">######</code> for H6</li>
                    <li>• Separate paragraphs with empty lines</li>
                    <li>• Keep excerpts under 160 characters for SEO</li>
                    <li>• Add FAQs for better Google search visibility</li>
                    <li>• Use Unsplash for free stock images</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogAdmin;
