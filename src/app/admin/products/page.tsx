"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";
import { Product } from "@/data/mock";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Star,
  Package,
  Eye,
  MoreVertical,
  Filter,
} from "lucide-react";

// ─── Product Form ───────────────────────────────────────────────────────────
function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const isEditing = !!product;
  const [form, setForm] = useState<Product>(
    product || {
      id: `prod-${Date.now()}`,
      name: "",
      slug: "",
      price: 0,
      comparePrice: undefined,
      category: "Necklaces",
      categorySlug: "necklaces",
      images: [""],
      rating: 4.5,
      reviewCount: 0,
      badges: [],
      description: "",
      features: [""],
      inStock: true,
      stockCount: 10,
    }
  );
  const [badgeInput, setBadgeInput] = useState("");

  const categoryMap: Record<string, string> = {
    Necklaces: "necklaces",
    Earrings: "earrings",
    Rings: "rings",
    Bracelets: "bracelets",
  };

  const handleChange = (field: keyof Product, value: unknown) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "name"
        ? { slug: (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }
        : {}),
      ...(field === "category"
        ? { categorySlug: categoryMap[value as string] || (value as string).toLowerCase() }
        : {}),
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImage = () => setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  const removeImage = (index: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeature = (index: number) =>
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

  const addBadge = () => {
    if (badgeInput.trim() && !form.badges.includes(badgeInput.trim())) {
      setForm((prev) => ({ ...prev, badges: [...prev.badges, badgeInput.trim()] }));
      setBadgeInput("");
    }
  };

  const removeBadge = (badge: string) =>
    setForm((prev) => ({ ...prev, badges: prev.badges.filter((b) => b !== badge) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={onCancel} className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
          <ArrowLeft size={18} className="text-neutral-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-neutral-900">{isEditing ? "Edit Product" : "Add New Product"}</h2>
          <p className="text-sm text-neutral-500">{isEditing ? "Update product details below" : "Fill in the details to create a new product"}</p>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all"
        >
          <Save size={14} />
          {isEditing ? "Save Changes" : "Add Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column — Main Info */}
        <div className="xl:col-span-2 space-y-5">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <Package size={15} className="text-neutral-400" />
              Basic Information
            </h3>

            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Product Name *</label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Minimal Gold Chain Necklace"
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold bg-neutral-50 text-neutral-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your product..."
                rows={4}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
                required
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                <ImageIcon size={15} className="text-neutral-400" />
                Product Images
              </h3>
              <button type="button" onClick={addImage} className="text-xs font-medium text-gold hover:text-gold-dark flex items-center gap-1">
                <Plus size={12} /> Add Image
              </button>
            </div>

            <div className="space-y-3">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-14 h-14 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-200 relative">
                    {img ? (
                      <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={18} className="text-neutral-300" />
                      </div>
                    )}
                  </div>
                  <input
                    value={img}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                  {form.images.length > 1 && (
                    <button type="button" onClick={() => removeImage(i)} className="p-2.5 hover:bg-red-50 rounded-xl text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                <Star size={15} className="text-neutral-400" />
                Product Features
              </h3>
              <button type="button" onClick={addFeature} className="text-xs font-medium text-gold hover:text-gold-dark flex items-center gap-1">
                <Plus size={12} /> Add Feature
              </button>
            </div>

            <div className="space-y-2.5">
              {form.features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={feat}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(i)} className="p-2 hover:bg-red-50 rounded-xl text-neutral-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Pricing & Meta */}
        <div className="space-y-5">
          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">Pricing</h3>

            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Price (₹) *</label>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                placeholder="0"
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Compare at Price (₹)</label>
              <input
                type="number"
                value={form.comparePrice || ""}
                onChange={(e) => handleChange("comparePrice", e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Optional — original price"
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">Organization</h3>

            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Rings">Rings</option>
                <option value="Bracelets">Bracelets</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Stock</label>
                <input
                  type="number"
                  value={form.stockCount || ""}
                  onChange={(e) => handleChange("stockCount", Number(e.target.value))}
                  placeholder="0"
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) => handleChange("rating", Number(e.target.value))}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleChange("inStock", !form.inStock)}
                className={`w-10 h-6 rounded-full transition-colors relative ${form.inStock ? "bg-emerald-500" : "bg-neutral-300"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${form.inStock ? "left-[18px]" : "left-0.5"}`} />
              </button>
              <span className="text-sm text-neutral-700">{form.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">Badges</h3>

            <div className="flex gap-2">
              <input
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                placeholder="e.g. Bestseller"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBadge())}
                className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              />
              <button type="button" onClick={addBadge} className="px-3 py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors">
                <Plus size={14} className="text-neutral-600" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.badges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  {badge}
                  <button type="button" onClick={() => removeBadge(badge)} className="hover:text-red-300 transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
              {form.badges.length === 0 && (
                <p className="text-xs text-neutral-400 italic">No badges added</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

// ─── Main Products Page ─────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const { state, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [view, setView] = useState<"list" | "form">("list");
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredProducts = state.products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === "all" || p.categorySlug === filterCategory;
    return matchSearch && matchCategory;
  });

  const handleSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    setView("list");
    setEditingProduct(undefined);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setView("form");
    setMenuOpen(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    setMenuOpen(null);
  };

  if (view === "form") {
    return (
      <ProductForm
        product={editingProduct}
        onSave={handleSave}
        onCancel={() => {
          setView("list");
          setEditingProduct(undefined);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">{state.products.length} total products</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(undefined);
            setView("form");
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-neutral-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-neutral-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold bg-white cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="necklaces">Necklaces</option>
            <option value="earrings">Earrings</option>
            <option value="rings">Rings</option>
            <option value="bracelets">Bracelets</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 bg-neutral-50 border-b border-neutral-100 text-xs font-medium text-neutral-500 uppercase tracking-wider">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* Products */}
        <div className="divide-y divide-neutral-100">
          {filteredProducts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Package size={40} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-neutral-500 font-medium">No products found</p>
              <p className="text-sm text-neutral-400 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr_80px] gap-3 md:gap-4 items-center px-5 sm:px-6 py-4 hover:bg-neutral-50/50 transition-colors">
                  {/* Product */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-200 relative">
                      <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          <Star size={10} className="fill-amber-400 text-amber-400" />
                          <span className="text-[11px] text-neutral-500">{product.rating}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400">·</span>
                        <span className="text-[11px] text-neutral-400">{product.reviewCount} reviews</span>
                        {product.badges.map((b) => (
                          <span key={b} className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded uppercase font-medium tracking-wider hidden sm:inline">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <p className="text-sm text-neutral-600 hidden md:block">{product.category}</p>

                  {/* Price */}
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-neutral-900">₹{product.price.toLocaleString()}</p>
                    {product.comparePrice && (
                      <p className="text-[11px] text-neutral-400 line-through">₹{product.comparePrice.toLocaleString()}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="hidden md:block">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      product.inStock
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500"}`} />
                      {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1">
                    {/* Mobile info */}
                    <div className="flex items-center gap-2 md:hidden mr-auto">
                      <span className="text-sm font-semibold text-neutral-900">₹{product.price.toLocaleString()}</span>
                      <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500"}`} />
                    </div>

                    <button
                      onClick={() => setMenuOpen(menuOpen === product.id ? null : product.id)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} className="text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {menuOpen === product.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                    <div className="absolute right-4 top-12 z-20 bg-white border border-neutral-200 rounded-xl shadow-lg py-1.5 min-w-[160px] animate-fade-in">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 w-full transition-colors"
                      >
                        <Edit3 size={14} />
                        Edit Product
                      </button>
                      <a
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 w-full transition-colors"
                      >
                        <Eye size={14} />
                        View on Store
                      </a>
                      <hr className="my-1 border-neutral-100" />
                      <button
                        onClick={() => {
                          setDeleteConfirm(product.id);
                          setMenuOpen(null);
                        }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl animate-scale-in">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 text-center">Delete Product?</h3>
            <p className="text-sm text-neutral-500 text-center mt-2">
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
